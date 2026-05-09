import { Typography } from '@mui/material'

// MUI chỉ export default `Card` từ '@mui/material/Card'. Ta đặt tên biến local là MuiCard
// để không trùng với component Card() của file này - MuiCard không phải tên trong thư viện.
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

function Card({ card, dndDisabled = false }) {
  const isPlaceholderCard = Boolean(card?.FE_PlaceHolderCard)
  const memberIds = card?.memberIds || []
  const comments = card?.comments || []
  const attachments = card?.attachments || []

  // Sử dụng hook useSortable của dnd-kit để biến mỗi card thành một item có thể kéo thả được
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card },
    // được truyền từ boardContent
    disabled: dndDisabled || isPlaceholderCard
  })

  // Tạo style cho card khi đang được kéo thả
  const dndKitCardStyle = {
    // Chuyển từ Transform sang Translate để khi kéo thả phần tử không bị thay đổi kích thước
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '2px solid #2ecc71' : undefined
  }

  // Hiển thị action khi card thực sự có dữ liệu liên quan
  const shouldShowCardActions =
    memberIds.length > 0 ||
    comments.length > 0 ||
    attachments.length > 0

  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyle}
      {...attributes}
      {...listeners}
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        display: isPlaceholderCard ? 'none' : 'block'
        // Các cách xử lý khác :
        // overflow: card?.FE_PlaceHolderCard ? 'hidden' : 'unset'
        // height: card?.FE_PlaceHolderCard ? 0 : 'unset'
      }}
    >
      {card?.cover && (
        <CardMedia
          sx={{ height: 140 }}
          image={card.cover}
          title={card?.title}
        />
      )}
      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {shouldShowCardActions &&
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          <Button size="small" startIcon={<GroupIcon />}>{memberIds.length}</Button>
          <Button size="small" startIcon={<CommentIcon />}>{comments.length}</Button>
          <Button size="small" startIcon={<AttachmentIcon />}>{attachments.length}</Button>
        </CardActions>
      }
    </MuiCard>
  )
}

export default Card
