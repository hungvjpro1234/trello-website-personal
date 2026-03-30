import { Typography } from '@mui/material'

// MUI chỉ export default `Card` từ '@mui/material/Card'. Ta đặt tên biến local là MuiCard
// để không trùng với component Card() của file này — MuiCard không phải tên trong thư viện.
import MuiCard from '@mui/material/Card'

import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function Card({ card }) {
  // Hàm để xác định xem có nên hiển thị phần CardActions hay không
  // Khi card có memberIds, comments hoặc attachments thì sẽ hiển thị; nếu không có cả 3 thì mới không hiển thị
  const shouldShowCardActions = () => !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length

  return (
    // 1 Item card trong column, có thể map ra nhiều card như này
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2',
      overflow: 'unset'
    }}>
      { card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover}/> }
      {/*cú pháp tương đương :
      1. if (card?.cover) <CardMedia />
      2. card?.cover ? <CardMedia /> : null
       */}

      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Typography >{card?.title}</Typography>
      </CardContent>

      { shouldShowCardActions() &&
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          {!!card?.memberIds?.length &&
          <Button size="small" startIcon={<GroupIcon />}>
            {card.memberIds.length}
          </Button>}

          {!!card?.comments?.length &&
          <Button size="small" startIcon={<CommentIcon />}>
            {card.comments.length}
          </Button>}

          {!!card?.attachments?.length &&
          <Button size="small" startIcon={<AttachmentIcon />}>
            {card.attachments.length}
          </Button>}
        </CardActions>
      }
    </MuiCard>
  )
}

export default Card

// L3 (line 39) : !! để ép kiểu boolean, nếu card?.memberIds?.length có giá trị là 0 thì sẽ trả về false, nếu có giá trị lớn hơn 0 thì sẽ trả về true.
// Nếu không có !! thì khi card?.memberIds?.length là 0 thì vẫn sẽ render Button với số lượng 0, còn khi có !! thì khi card?.memberIds?.length là 0 thì sẽ không render Button.