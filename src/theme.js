// File cấu hình theme của MUI cho toàn bộ dự án
// import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '50px'

const theme = extendTheme({
  // Tự custom theme để import vào layout của trello-web
  trello: {
    appBarHeight : APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT
  },

  // đổi theme của giao diện
  colorSchemes: {
    light: {
      // palette: {
      //   primary: {
      //     main: teal[500],
      //     50: teal[50]
      //   },
      //   secondary: {
      //     main: deepOrange[500]
      //   }
      // }
      // // spacing: (factor) => `${0.25 * factor}rem`
    },
    dark: {
      // palette: {
      //   primary: {
      //     main: cyan[500],
      //     50: cyan[50]
      //   },
      //   secondary: {
      //     main: orange[500]
      //   }
      // }
      // // spacing: (factor) => `${0.25 * factor}rem`
    }
  },

  components: {
    // style lại scroll bar
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white',
            borderRadius: '8px'
          }
        }
      }
    },
    // style lại để các text trong các Button không tự viết hoa
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderWidth: '0.5px',
          '&:hover': { borderWidth: '0.5px' }
        }
      }
    },

    // sửa màu chữ trong các label ( thường là chữ được hiển thị khi chưa nhập )
    MuiInputLabel: {
      styleOverrides: {
        root: () => ({
          // color: theme.palette.primary.main,
          fontSize: '0.875rem'
        })
      }
    },

    // custom lại màu của thành phần trong input outlined
    MuiOutlinedInput: {
      styleOverrides: {
        root: () => ({
          // color: theme.palette.primary.main,
          fontSize: '0.875rem',
          // không hover
          '& .MuiOutlinedInput-notchedOutline': {
            // borderColor: theme.palette.primary.light
          },
          // hover
          '&:hover .MuiOutlinedInput-notchedOutline': {
            // borderColor: theme.palette.primary.main
          },
          // reset để khi hover vào, border không bị đậm lên
          '& fieldset': { borderWidth: '0.5px !important' },
          '&:hover fieldset': { borderWidth: '2px !important' },
          '&.Mui-focused fieldset': { borderWidth: '2px !important' }
        })
      }
    },

    // custom lại các variant body1 - mặc định trong typography
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': {
            fontSize: '0.875rem'
          }
        }
      }
    }
  }
})

export default theme