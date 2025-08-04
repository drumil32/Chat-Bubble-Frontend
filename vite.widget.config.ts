import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Separate build config for the embeddable widget
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/chatbot.ts'),
      name: 'ChatbotWidget',
      fileName: 'chatbot',
      formats: ['umd']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    },
    outDir: 'dist-widget',
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});