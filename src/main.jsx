import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import { CssBaseline } from '@mui/material'
// import { ThemeProvider } from '@mui/material/styles'
// CssVarsProvider để sử dụng tính năng CSS Variables của MUI, giúp tối ưu hóa hiệu suất và hỗ trợ dynamic theming
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Sử dụng CssVarsProvider để áp dụng theme cho toàn bộ ứng dụng */}
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </React.StrictMode>
)
