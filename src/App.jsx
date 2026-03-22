import { useColorScheme } from '@mui/material/styles'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

import { Box, Container } from '@mui/material'

// Dùng component select trong MUI lib để tạo được nút select switch mode
// Cài đặt trong component để chuyển đổi giới trị giữa light và dark mode
function ModeSelect() {

  // dùng hook useColorScheme trong MUI lib để chuyển đổi giới trị giữa light và dark mode
  const { mode, setMode } = useColorScheme()

  // Hàm chuyển đổi giới trị giữa light và dark mode
  const handleChange = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  // Components chứa nút select chuyển đổi giới trị giữa light và dark mode
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="select-dark-light-mode"
        id="demo-select-small"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value={'light'}>
          <Box sx={{ display : 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon fontSize='small'/>
            Light
          </Box>
        </MenuItem>

        <MenuItem value={'dark'}>
          <Box sx={{ display : 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeOutlinedIcon fontSize='small'/>
            Dark
          </Box>
        </MenuItem>

        <MenuItem value={'system'}>
          <Box sx={{ display : 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightnessIcon fontSize='small'/>
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

// // Hàm lấy sẵn từ docs của MUI để chuyển đổi giới trị giữa light và dark mode
// // https://v5.mui.com/material-ui/experimental-api/css-theme-variables/migration/
// function ModeToggle() {
//   const { mode, setMode } = useColorScheme()
//   return (
//     <Button
//       onClick={() => {
//         setMode(mode === 'light' ? 'dark' : 'light')
//       }}
//     >
//       {mode === 'light' ? 'Turn dark' : 'Turn light'}
//     </Button>
//   )
// }

function App() {
  return (
    // Container để bọc toàn bộ trang web
    <Container maxWidth = {false} disableGutters sx={{ height: '100vh' }}>

      {/* Header */}
      <Box sx = {
        {
          backgroundColor: 'primary.light',
          width: '100%',
          // Dùng bản sử dụng tạo ra bộ cơ sở trên theme.js
          height: (theme) => theme.trello.appBarHeight,
          display: 'flex',
          alignItems: 'center'
        }
      }>
        {/* ModeSelect để switch giới trị giữa light và dark mode */}
        <ModeSelect />
      </Box>

      {/* Board Bar */}
      <Box sx={{
        backgroundColor: 'primary.dark',
        width: '100%',
        // Dùng bản sử dụng tạo ra bộ cơ sở trên theme.js
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
        Board Bar
      </Box>

      {/* Board Content */}
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        // Dùng bản sử dụng tạo ra bộ cơ sở trên theme.js
        height: (theme) => `calc(100% - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        display: 'flex',
        alignItems: 'center'
      }}>
        Board Content
      </Box>

      {/* <ModeToggle /> */}
    </Container>
  )
}

export default App
