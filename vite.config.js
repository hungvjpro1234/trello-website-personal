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

  // Fix: styled_default is not a function (MUI + Emotion + Vite pre-bundling issue)
  // Buộc Vite phải pre-bundle @emotion/styled cùng các MUI component trong một chunk
  optimizeDeps: {
    include: [
      '@emotion/react',
      '@emotion/styled',
      '@mui/material/Tooltip',
      '@mui/material/Popper'
    ]
  },

  // base: './'
  resolve: {
    alias: [
      // thay thế đường dẫn khi import : /src thành ~
      { find: '~', replacement: '/src' }
    ]
  }
})
