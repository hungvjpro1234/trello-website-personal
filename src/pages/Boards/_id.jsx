// Board Details
import { Container } from '@mui/material'

// Các file ngoài thư mục nên sử dụng absolute path
import Appbar from '~/components/AppBar/AppBar'

// Các file trong cùng thư mục nên sử dụng relative path cho gọn cú pháp
import BoardBar from './BoardBar'
import BoardContent from './BoardContent/BoardContent'

function Board() {
  return (
    // Container để bọc toàn bộ trang web
    <Container maxWidth = {false} disableGutters sx={{ height: '100vh' }}>

      {/* App Bar */}
      <Appbar />

      {/* Board Bar */}
      <BoardBar />

      {/* Board Content */}
      <BoardContent />
    </Container>
  )
}

export default Board