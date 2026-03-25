// File cấu hình theme của MUI cho toàn bộ dự án
// import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
  // Tự custom theme để import vào layout của trello-web
  trello: {
    appBarHeight : '58px',
    boardBarHeight: '60px'
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
    }
  }
})

export default theme