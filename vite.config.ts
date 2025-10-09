import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          gsap: ['gsap', '@gsap/react'],
          icons: ['react-icons'],
          analytics: ['@vercel/analytics', '@vercel/speed-insights']
        },
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    assetsDir: 'assets',
    outDir: 'dist',
    // Add sourcemap for better debugging in production
    sourcemap: false,
    // Ensure proper cache busting
    emptyOutDir: true,
    // Ensure consistent asset naming
    assetsInlineLimit: 0,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', '@gsap/react'],
    // Force pre-bundling to avoid cache issues
    force: true
  },
  server: {
    port: 3000,
    host: true,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  },
  // Add define to ensure proper environment detection
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0')
  },
  // Ensure proper asset handling
  assetsInclude: ['**/*.woff2', '**/*.woff', '**/*.ttf'],
})
