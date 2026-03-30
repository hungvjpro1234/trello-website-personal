// Board Details
import { Container } from '@mui/material'

// Các file ngoài thư mục nên sử dụng absolute path
import Appbar from '~/components/AppBar/AppBar'

// Các file trong cùng thư mục nên sử dụng relative path cho gọn cú pháp
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'

function Board() {
  return (
    // Container để bọc toàn bộ trang web
    <Container maxWidth = {false} disableGutters sx={{ height: '100vh' }}>

      {/* App Bar */}
      <Appbar />

      {/* Board Bar */}
      <BoardBar board={ mockData?.board } />

      {/* Board Content */}
      <BoardContent board={ mockData?.board } />
    </Container>
  )
}

export default Board

// L1 : dùng cú pháp truy cập "?." để tránh lỗi khi dữ liệu chưa có, hoặc có thể dùng && để kiểm tra dữ liệu trước khi truy cập ( optional chaining operator "?." là một tính năng của JavaScript cho phép truy cập vào các thuộc tính của một đối tượng mà không gây lỗi nếu đối tượng đó là null hoặc undefined. Nếu đối tượng tồn tại, nó sẽ trả về giá trị của thuộc tính; nếu không, nó sẽ trả về undefined thay vì gây lỗi.
// Ví dụ: const value = obj?.property; Nếu obj là null hoặc undefined, value sẽ được gán là undefined)
