import { Box } from '@mui/material'
import Card from './Card/Card'
import theme from '~/theme'

function ListCards() {
  const COLUMN_HEADER_HEIGHT = theme.trello.columnHeaderHeight
  const COLUMN_FOOTER_HEIGHT = theme.trello.columnFooterHeight

  return (
    // Danh sách các card trong 1 column, có scroll nếu số lượng card nhiều
    <Box sx={{
      p: '0 5px',
      m: '0 5px',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      overflowX: 'hidden',
      overflowY: 'auto',
      maxHeight: (theme) => `calc(
        ${theme.trello.boardContentHeight} -
        ${theme.spacing(5)} -
        ${COLUMN_HEADER_HEIGHT} -
        ${COLUMN_FOOTER_HEIGHT}
      )`,
      '& > *': {
        flexShrink: 0
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#ced0da'
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#bfc2cf'
      }
    }}>
      {/* Item card có media */}
      <Card />
      {/* Item card không có media, prop để truyền xuống component Card, làm cờ để xác định xem card này có media hay không */}
      <Card temporaryHideMedia />
    </Box>
  )
}

export default ListCards
