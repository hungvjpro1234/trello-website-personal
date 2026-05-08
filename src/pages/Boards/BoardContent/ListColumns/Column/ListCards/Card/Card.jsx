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

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { buildCardCoverUrl } from '~/utils/mockImages'

function Card({ card }) {
  const cardCover = card?.cover || buildCardCoverUrl(card._id)

  // Sử dụng hook useSortable của dnd-kit để biến mỗi cột thành một item có thể kéo thả được
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card }
  })

  // Tạo style cho cột khi đang được kéo thả
  const dndKitCardStyle = {
    // touchAction: 'none', // Tắt hành động chạm mặc định để tránh xung đột với hành vi kéo thả trên thiết bị di động

    // Chuyển từ Transform sang Translate để kh kéo thả phần tử không bị thay đổi kích thước
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '2px solid #2ecc71' : undefined
  }

  // Xác định xem có nên hiển thị các action của card hay không, nếu card có thành viên, bình luận hoặc tệp đính kèm thì hiển thị, nếu không thì ẩn đi để giao diện gọn hơn
  const shouldShowCardActions =
  card.memberIds.length > 0 ||
  card.comments.length > 0 ||
  card.attachments.length > 0

  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyle}
      {...attributes}
      {...listeners}
      sx={{
        cursor: 'pointer',
        boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden'
      }
      }>
      <CardMedia
        sx={{ height: 140 }}
        image={cardCover}
        title={card?.title}
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {shouldShowCardActions &&
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          <Button size="small" startIcon={<GroupIcon />}>{card.memberIds.length}</Button>
          <Button size="small" startIcon={<CommentIcon />}>{card.comments.length}</Button>
          <Button size="small" startIcon={<AttachmentIcon />}>{card.attachments.length}</Button>
        </CardActions>
      }
    </MuiCard>
  )
}

export default Card
