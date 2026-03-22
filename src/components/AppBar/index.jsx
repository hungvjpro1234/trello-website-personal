import { Box } from '@mui/material'
import ModeSelect from '~/components/ModeSelect'

function Appbar() {
  return (
    /* App Bar */
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
  )
}

export default Appbar