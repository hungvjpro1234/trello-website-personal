// Board Content
import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'

function BoardContent() {
  return (
    // Container để của phần board content, là phần tử cha to nhất, để chỉnh padding và margin cho toàn bộ phần content, tránh việc phải chỉnh cho từng phần tử con bên trong
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      width: '100%',
      // Dùng bản sử dụng tạo ra bộ cơ sở trên theme.js
      height: (theme) => theme.trello.boardContentHeight,
      p: '10px 0'
    }}>
      {/* Box chứa list các columns */}
      <ListColumns />
    </Box>
  )
}

export default BoardContent