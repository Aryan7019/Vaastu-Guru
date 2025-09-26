import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    server: {
      port: 3000,
      host: true,
      strictPort: true,
      // Vercel-friendly HMR configuration
      hmr: mode === 'development' ? {
        protocol: 'ws',
        host: 'localhost',
        port: 3000
      } : false,
      // Proxy API requests in development
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        }
      }
    },
    resolve: {
      alias: {
        '@': '/src',
        '~': '/'
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      // Vercel optimization
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', '@clerk/clerk-react'],
            ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
          }
        }
      }
    },
    // Define global constant
    define: {
      'process.env': {
        VITE_CLERK_PUBLISHABLE_KEY: JSON.stringify(env.VITE_CLERK_PUBLISHABLE_KEY),
        VITE_API_BASE_URL: JSON.stringify(env.VITE_API_BASE_URL)
      }
    },
    // Vercel preview configuration
    preview: {
      port: 3000,
      host: true
    }
  };
});