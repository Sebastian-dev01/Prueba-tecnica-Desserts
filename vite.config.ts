import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    watch: {
      // json-server escribe en db.json en cada create/update/delete.
      // Sin esto, Vite detecta el cambio y recarga la página completa,
      // borrando las notificaciones (toasts) antes de que se vean.
      ignored: ["**/db.json"],
    },
  },
})
