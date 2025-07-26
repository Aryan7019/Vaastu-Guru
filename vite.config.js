import path from 'node:path';
import react from '@vitejs/plugin-react';
import { createLogger, defineConfig } from 'vite';

const isDev = process.env.NODE_ENV !== 'production';

// Dynamic imports for development-only plugins
let inlineEditPlugin, editModeDevPlugin;
if (isDev) {
  try {
    inlineEditPlugin = (await import('./plugins/visual-editor/vite-plugin-react-inline-editor.js')).default;
    editModeDevPlugin = (await import('./plugins/visual-editor/vite-plugin-edit-mode.js')).default;
  } catch (error) {
    console.warn('Could not load visual editor plugins:', error.message);
  }
}

// Error handling scripts
const errorHandlers = {
  viteError: `
    const handleViteOverlay = (node) => {
      if (!node.shadowRoot) return;
      const backdrop = node.shadowRoot.querySelector('.backdrop');
      if (backdrop) {
        const message = node.shadowRoot.querySelector('.message-body')?.textContent.trim() || '';
        const file = node.shadowRoot.querySelector('.file')?.textContent.trim() || '';
        window.parent.postMessage({
          type: 'horizons-vite-error',
          error: message + (file ? ' File:' + file : '')
        }, '*');
      }
    };

    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE && 
              (node.tagName?.toLowerCase() === 'vite-error-overlay' || 
               node.classList?.contains('backdrop'))) {
            handleViteOverlay(node);
          }
        });
      });
    }).observe(document.documentElement, { childList: true, subtree: true });
  `,

  runtimeError: `
    window.onerror = (message, source, lineno, colno, error) => {
      window.parent.postMessage({
        type: 'horizons-runtime-error',
        error: JSON.stringify({
          message,
          source,
          lineno,
          colno,
          stack: error?.stack,
          name: error?.name
        })
      }, '*');
    };
  `,

  consoleError: `
    const originalError = console.error;
    console.error = (...args) => {
      originalError.apply(console, args);
      const error = args.find(arg => arg instanceof Error);
      window.parent.postMessage({
        type: 'horizons-console-error',
        error: error ? error.stack : args.join(' ')
      }, '*');
    };
  `,

  fetchMonitor: `
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        if (!response.ok) {
          const error = await response.clone().text();
          console.error(\`Fetch error: \${response.status} \${response.statusText}\`, error);
        }
        return response;
      } catch (error) {
        console.error('Fetch failed:', error);
        throw error;
      }
    };
  `
};

// Create custom logger to filter CSS errors
const logger = createLogger();
const originalError = logger.error;
logger.error = (msg, options) => {
  if (!options?.error?.toString().includes('CssSyntaxError')) {
    originalError(msg, options);
  }
};

export default defineConfig({
  customLogger: logger,
  plugins: [
    ...(isDev && inlineEditPlugin && editModeDevPlugin 
      ? [inlineEditPlugin(), editModeDevPlugin()] 
      : []),
    react(),
    {
      name: 'error-handlers',
      transformIndexHtml(html) {
        return {
          html,
          tags: Object.entries(errorHandlers).map(([name, code]) => ({
            tag: 'script',
            attrs: { type: 'module' },
            children: code,
            injectTo: 'head'
          }))
        };
      }
    }
  ],
  server: {
    cors: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'credentialless',
      'Cross-Origin-Opener-Policy': 'same-origin'
    },
    host: true,
    port: 3000,
    strictPort: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs']
  },
  build: {
    sourcemap: isDev,
    rollupOptions: {
      external: [
        /^@babel\/.*/,
        'react-dom/server'
      ],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@clerk/clerk-react']
        }
      }
    },
    chunkSizeWarningLimit: 1600
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@clerk/clerk-react'
    ],
    exclude: ['@babel/standalone']
  }
});