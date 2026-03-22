// Board Bar component trong trang Board ( hầu như chỉ sử dụng ở trang Board nên tách ra thành component bên trong page)
import Box from '@mui/material/Box'

function BoardBar() {
  return (
    /* Board Bar */
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
  )
}

export default BoardBar