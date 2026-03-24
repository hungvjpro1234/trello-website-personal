import { Box, Typography } from '@mui/material'
import ModeSelect from '~/components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import WorkSpace from './Menu/WorkSpace'
import Recent from './Menu/Recent'
import Starred from './Menu/Starred'
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

import Profile from './Menu/Profiles'


function Appbar() {
  return (
    // Thanh Header
    <Box px={2} sx = {
      {
        width: '100%',
        // Dùng bản sử dụng tạo ra bộ cơ sở trên theme.js
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }>
      {/* Khối sider trái */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'primary.main' }}/>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {/* <img src={trelloLogo} alt="trello-logo" /> */}
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'primary.main' }}/>

          {/* variant để chọn xem nội dung sẽ thuộc loại thẻ nào */}
          <Typography variant='span' sx={{ color: 'primary.main', fontSize: '1.2rem', fontWeight: 'bold' }}> Trello </Typography>
        </Box>

        <WorkSpace />

        <Recent />

        <Starred />

        <Templates />

        <Button variant="outlined">Create</Button>
      </Box>

      {/* Khối sider phái */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField id="outlined-search" label="Search..." type="search" size='small'/>

        {/* ModeSelect để switch giới trị giữa light và dark mode */}
        <ModeSelect />

        {/* thẻ Tooltip để xử lý hover vào icon thông báo */}
        <Tooltip title="Notification">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>

        <Tooltip title="Help" sx={{ cursor: 'pointer' }}>
          <HelpOutlineIcon />
        </Tooltip>

        <Profile />
      </Box>
    </Box>
  )
}

export default Appbar