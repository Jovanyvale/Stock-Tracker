import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })

  ],
  base: '/app/'
  build: {
    rollupOptions: {
      output: {
        // JS principal
        entryFileNames: "js/[name]-[hash].js",
        // JS de chunks (code splitting)
        chunkFileNames: "js/[name]-[hash].js",
        // Resto de assets: imágenes, CSS, etc.
        assetFileNames: (assetInfo) => {
          const fileName = assetInfo.names?.[0] ?? assetInfo.name ?? "";
          const ext = fileName.split(".").pop()?.toLowerCase() ?? "";

          if (/^(png|jpe?g|gif|svg|webp|avif|ico)$/.test(ext)) {
            return "img/[name]-[hash][extname]";
          }
          if (ext === "css") {
            return "css/[name]-[hash][extname]";
          }
          if (/^(woff2?|ttf|otf|eot)$/.test(ext)) {
            return "fonts/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
})
