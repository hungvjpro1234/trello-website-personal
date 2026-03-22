// Board Details
import { Container } from '@mui/material'

import Appbar from '../../components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'

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