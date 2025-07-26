import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createLogger } from 'vite';

// Simplified error handlers (compatible with production)
const errorHandlers = {
  runtimeError: `
    window.onerror = (message, source, lineno, colno, error) => {
      console.error('Runtime Error:', { message, source, lineno, colno, stack: error?.stack });
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

// Production-safe logger
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
      clientPort: 443 // Required for Vercel previews
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '~': '/'
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs']
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: process.env.NODE_ENV !== 'production',
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@clerk/clerk-react'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@clerk/clerk-react'
    ]
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }
});