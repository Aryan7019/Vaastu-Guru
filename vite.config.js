import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createLogger } from 'vite';

// Error handling scripts (simplified from your original)
const errorHandlers = {
  viteError: `
    const handleViteOverlay = (node) => {
      if (!node.shadowRoot) return;
      const backdrop = node.shadowRoot.querySelector('.backdrop');
      if (backdrop) {
        const message = node.shadowRoot.querySelector('.message-body')?.textContent.trim() || '';
        const file = node.shadowRoot.querySelector('.file')?.textContent.trim() || '';
        console.error('Vite Error:', message + (file ? ' File:' + file : ''));
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
      console.error('Runtime Error:', { message, source, lineno, colno, stack: error?.stack });
    };
  `
};

// Custom logger to filter CSS errors
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
  
  // Vercel-optimized server configuration
  server: {
    cors: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'credentialless',
      'Cross-Origin-Opener-Policy': 'same-origin'
    },
    host: true,
    port: 3000,
    strictPort: true,
    hmr: {
      clientPort: 443 // Important for Vercel preview deployments
    }
  },

  // Resolve configuration
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '~', replacement: '/' }
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs']
  },

  // Production build settings
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: process.env.NODE_ENV !== 'production',
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@clerk/clerk-react'],
          lodash: ['lodash'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },

  // Optimization settings
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@clerk/clerk-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu'
    ],
    exclude: ['@babel/standalone']
  },

  // Vercel-specific optimizations
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  }
});