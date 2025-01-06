import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirige toutes les requêtes commençant par /api vers le serveur Django
      '/api': {
        target: 'http://127.0.0.1:8000', // Adresse de votre serveur Django
        changeOrigin: true, // Modifie l'origine de l'en-tête Host pour correspondre au backend
        secure: false, // Si vous utilisez HTTPS en local, passez à true
        rewrite: (path) => path.replace(/^\/api/, ''), // Optionnel : Réécrit le chemin si nécessaire
      },
    },
  },
})
