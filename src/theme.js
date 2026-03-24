// File cấu hình theme của MUI cho toàn bộ dự án
import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
  // Tự custom theme để import vào layout của trello-web
  trello: {
    appBarHeight : '58px',
    boardBarHeight: '60px'
  },

  // theme được custom
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: teal[500]
        },
        secondary: {
          main: deepOrange[500]
        }
      }
      // spacing: (factor) => `${0.25 * factor}rem`
    },
    dark: {
      palette: {
        primary: {
          main: cyan[500]
        },
        secondary: {
          main: orange[500]
        }
      }
      // spacing: (factor) => `${0.25 * factor}rem`
    }
  }
})

export default theme