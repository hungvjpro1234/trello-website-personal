import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    }),
    // sử dụng svgr để có thể sử dụng file SvgIcon trong react
    svgr()
  ],

  // base: './'
  resolve: {
    alias: [
      // thay thế đường dẫn khi import : /src thành ~
      { find: '~', replacement: '/src' }
    ]
  }
})
