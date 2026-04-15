import { Box, Button } from '@mui/material'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumns({ columns }) {
  // id để truyền vào SortableContext
  const columnIds = columns.map(column => column._id)

  return (
    <SortableContext items={ columnIds } strategy={horizontalListSortingStrategy}>
      {/* Box sinh ra để bọc các item, để có thể thao tác các css thuận tiện hơn, ví dụ làm thanh scroll không bị sát với item */}
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
    </SortableContext>
  )
}

export default ListColumns

// L ( line 10 ) : horizontalListSortingStrategy là một chiến lược sắp xếp được cung cấp bởi thư viện dnd-kit, được sử dụng để xác định cách các phần tử trong một danh sách ngang (horizontal list) sẽ được sắp xếp khi người dùng kéo và thả chúng. Khi bạn sử dụng SortableContext với horizontalListSortingStrategy, nó sẽ tự động xử lý việc sắp xếp các phần tử trong danh sách theo chiều ngang, đảm bảo rằng chúng được sắp xếp đúng cách khi người dùng di chuyển chúng.

// L ( line 7 ) : SortableContext yêu cầu items là một mảng dạng ['id-1', 'id-2', 'id-3'] chứ không phải[{id : 'id-1'}, {id : 'id-2'}, {id : 'id-3'}] nếu không đúng sẽ vẫn kéo thả được nhưng không có animation
// nên khi truyền vào items, mình sẽ truyền vào mảng columns đã được sắp xếp lại theo đúng thứ tự, nhưng chỉ lấy ra mỗi id của column để truyền vào items, còn lại các thông tin khác của column sẽ được truyền vào data của useSortable ở component Column, để khi kéo thả thì mình vẫn có thể lấy được toàn bộ thông tin của column đó.