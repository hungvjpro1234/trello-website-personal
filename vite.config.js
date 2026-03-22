import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: './'
  resolve: {
    alias: [
      // thay thế đường dẫn khi import : /src thành ~
      { find: '~', replacement: '/src' }
    ]
  }
})
