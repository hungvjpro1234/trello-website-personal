import { Box, Button } from '@mui/material'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

function ListColumns({ columns }) {

  return (
    // Box sinh ra để bọc các item, để có thể thao tác các css thuận tiện hơn, ví dụ làm thanh scroll không bị sát với item
    <Box sx={{
      // Kế thừa bg của thẻ cha
      bgcolor: 'inherit',
      width: '100%',
      height: '100%',
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden',
      '&::-webkit-scrollbar-track': { m: 2 }
    }}>
      {/* Các item cột */}
      {columns.map(column => <Column key={column._id} column={column} />)}

      {/* Nút thêm cột */}
      <Box
        sx={{
          minWidth: '200px',
          maxWidth: '200px',
          mx: 2,
          borderRadius: '6px',
          height: 'fit-content',
          bgcolor: '#ffffff3d'
        }}
      >
        <Button
          startIcon={ <NoteAddIcon /> }
          sx={{
            color: 'white',
            width: '100%',
            justifyContent: 'flex-start',
            pl: 2.5,
            py: 1
          }}
        >
          Add new column
        </Button>
      </Box>
    </Box>
  )
}

export default ListColumns