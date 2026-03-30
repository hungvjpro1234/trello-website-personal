// Board Content
import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

function BoardContent({ board }) {
  // Sắp xếp lại thứ tự các column theo đúng thứ tự đã lưu trong columnOrderIds của board -> trả về 1 mảng column đã được sắp xếp theo đúng thứ tự
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

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
      <ListColumns columns= { orderedColumns }/>
    </Box>
  )
}

export default BoardContent