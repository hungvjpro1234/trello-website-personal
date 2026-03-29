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

function Card({ temporaryHideMedia }) {
  // Nếu prop temporaryHideMedia là true thì sẽ render card không có media, ngược lại sẽ render card có media
  if (temporaryHideMedia) {
    return (
      <MuiCard sx={{
        cursor: 'pointer',
        boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2',
        overflow: 'unset'
      }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Typography >Chua Co Media</Typography>
        </CardContent>
      </MuiCard>
    )
  }

  return (
    // 1 Item card trong column, có thể map ra nhiều card như này
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2',
      overflow: 'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://scontent.fhan5-2.fna.fbcdn.net/v/t1.6435-9/102867957_327454421579632_8027934894137765875_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=b895b5&_nc_ohc=yhNdueDjdN0Q7kNvwGhumUN&_nc_oc=Adr7lBnY8uHIkHrAJY8CQaHA8VXS3pim9b36eDsRFVk-ZKFHQbig2kwTwJ_FumkVS_k&_nc_zt=23&_nc_ht=scontent.fhan5-2.fna&_nc_gid=Rqnj34qsTe1ksazq2iXWfQ&_nc_ss=7a32e&oh=00_AfxqoGTIxOyRmGkCNyt6xT4hVAVtu8iaQuaOnDuW37IdJw&oe=69EF68F6"
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Typography >Vua Dep Trai</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupIcon />}>20</Button>
        <Button size="small" startIcon={<CommentIcon />}>20</Button>
        <Button size="small" startIcon={<AttachmentIcon />}>20</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card