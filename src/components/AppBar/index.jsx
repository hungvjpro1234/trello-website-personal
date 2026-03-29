import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import ModeSelect from '~/components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import WorkSpace from './Menu/WorkSpace'
import Recent from './Menu/Recent'
import Starred from './Menu/Starred'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
// import trelloLogo from '~/assets/trello-icon.'
import SvgIcon from '@mui/material/SvgIcon'
import { ReactComponent as TrelloIcon } from '~/assets/trello-icon.svg'
import Templates from './Menu/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Badge from '@mui/material/Badge'

import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

import Profile from './Menu/Profiles'

function Appbar() {
  // state xử lý việc nhập / xóa của nút tim kiếm
  const [searchValue, setSearchValue] = useState('')

  return (
    // Thanh Header
    <Box px={2} sx = {
      {
        width: '100%',
        // Dùng bản sử dụng tạo ra bộ cơ sở trên theme.js
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'),
        '&::-webkit-scrollbar-track': { m: 2 }
      }
    }>
      {/* Khối Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'white' }}/>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {/* <img src={trelloLogo} alt="trello-logo" /> */}
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'white' }}/>

          {/* Typography để hiển thị text , variant để chọn xem nội dung sẽ thuộc loại thẻ nào */}
          <Typography variant='span' sx={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}> Trello </Typography>
        </Box>

        {/* Khối menu và button create */}
        <Box sx={{ display: { xs: 'none', md: 'flex', gap: 1 } }}>
          <WorkSpace />
          <Recent />
          <Starred />
          <Templates />
        </Box>

        <Button
          variant="outlined"
          startIcon={<LibraryAddIcon />}
          sx={{
            color: 'white',
            border: 'none',
            '&:hover': { border: 'none' }
          }}
        >
          Create
        </Button>
      </Box>

      {/* Khối sider phái */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          id="outlined-search"
          label="Search..."
          type="text"
          size='small'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx = {{ color: 'white' }}/>
              </InputAdornment>
            ),
            endAdornment: (
              <CloseIcon
                fontSize='small'
                sx = {{ color: searchValue ? 'white' : 'transparent', cursor: 'pointer' }}
                onClick={() => setSearchValue('')}
              />
            )
          }}
          sx={{
            minWidth: '120px',
            maxWidth: '170px',
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              borderColor: 'white',
              '& fieldset': {
                borderColor: 'white'
              },
              '&:hover fieldset': {
                borderColor: 'white'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white'
              }
            }
          }}
        />

        {/* ModeSelect để switch giới trị giữa light và dark mode */}
        <ModeSelect />

        {/* thẻ Tooltip để xử lý hover vào icon (trong ví dụ này là icon thông báo)*/}
        <Tooltip title="Notification">
          <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'white' }}/>
          </Badge>
        </Tooltip>

        <Tooltip title="Help" sx={{ cursor: 'pointer' }}>
          <HelpOutlineIcon sx={{ color: 'white' }}/>
        </Tooltip>

        <Profile />
      </Box>
    </Box>
  )
}

export default Appbar