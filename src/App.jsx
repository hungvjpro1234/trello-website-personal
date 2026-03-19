import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Button from '@mui/material/Button'
import { useColorScheme } from '@mui/material/styles'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

import { Box, ThemeProvider } from '@mui/material';

// Dùng component select trong MUI lib để tạo được nút select switch mode
// Cài đặt trong component để chuyển đổi giới trị giữa light và dark mode
function ModeSelect() {
  // const [age, setAge] = React.useState('');
  
  // dùng hook useColorScheme trong MUI lib để chuyển đổi giới trị giữa light và dark mode
   const { mode, setMode } = useColorScheme()

  // Hàm chuyển đổi giới trị giữa light và dark mode
  const handleChange = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  };

  // Nút chuyển đổi giới trị giữa light và dark mode
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
        <MenuItem value={"light"}>
          <Box sx={{ display : 'flex', alignItems: 'center', gap: 1}}>
            <LightModeIcon fontSize='small'/>
            Light
          </Box>
        </MenuItem>

        <MenuItem value={"dark"}>
          <Box sx={{ display : 'flex', alignItems: 'center', gap: 1}}>
            <DarkModeOutlinedIcon fontSize='small'/>
            Dark
          </Box>
        </MenuItem>

        <MenuItem value={"system"}>
          <Box sx={{ display : 'flex', alignItems: 'center', gap: 1}}>
            <SettingsBrightnessIcon fontSize='small'/>
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

// Hàm lấy sẵn từ docs của MUI để chuyển đổi giới trị giữa light và dark mode
// https://v5.mui.com/material-ui/experimental-api/css-theme-variables/migration/
function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}

function App() {
  return (
    <>
      <ModeSelect />
      <ModeToggle />
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </>
  )
}

export default App
