// Board Content
import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

function BoardContent({ board }) {
  // https://dndkit.com/legacy/api-documentation/sensors
  // xử lý các api của dnd-kit để tùy chỉnh hành vi kéo thả theo ý muốn
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      touchAction: 'none', // Tắt hành động chạm mặc định để tránh xung đột với hành vi kéo thả trên thiết bị di động -- nhưng vẫn bug trên mobile
      distance: 10 // Kéo sau khi di chuyển 10px để tránh việc click vào column mà bị kéo luôn
    }
  })

  // ưu tiên sử dụng MouseSensor và TouchSensor để trải nghiệm trên mobile được mượt 
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10 // yêu cầu chuột di chuyển 10px trước khi kích hoạt kéo thả để tránh việc click vào column mà bị kéo luôn
    }
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250, // Kéo sau khi giữ nguyên 250ms để tránh việc chạm vào column mà bị kéo luôn
      tolerance: 5 // Yêu cầu chạm di chuyển 5px trước khi kích hoạt kéo thả
    }
  })

  const sensors = useSensors(mouseSensor, touchSensor)

  // state để quản lý thứ tự các column
  const [orderedColumnsState, setOrderedColumnsState] = useState([])

  // Sử dụng useEffect để sắp xếp lại thứ tự các column khi nhận được props board mới
  useEffect(() => {
    // Sắp xếp lại thứ tự các column theo đúng thứ tự đã lưu trong columnOrderIds của board -> trả về 1 mảng column đã được sắp xếp theo đúng thứ tự
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumnsState(orderedColumns)
  }, [board] )

  // Hàm xử lý khi kết thúc việc kéo thả một column
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd :', event)
    const { active, over } = event

    // Nếu kéo linh tinh ra ngoài -> return luôn, tránh lỗi
    if (!over) return

    // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu -> cập nhật lại thứ tự column
    if (active.id !== over.id) {
      // Tìm và lấy ví trí cũ của column được kéo ( từ active )
      const oldIndex = orderedColumnsState.findIndex(column => column._id === active.id)
      // Tìm và Lấy vị trí mới của column được kéo ( từ over )
      const newIndex = orderedColumnsState.findIndex(column => column._id === over.id)

      // Sử dụng hàm arrayMove của dnd-kit để sắp xếp lại thứ tự column trong mảng orderedColumnsState theo đúng thứ tự mới sau khi kéo thả ( từ oldIndex đến newIndex )
      // -> Trả về một mảng column mới đã được sắp xếp lại theo đúng thứ tự mới sau khi kéo thả
      const dndOrderedColumns = arrayMove(orderedColumnsState, oldIndex, newIndex)
      // console.log('DND Ordered Columns:', dndOrderedColumns)

      // Cập nhật lại phần tử columnOrderIds khi kết nối db thật khi  gọi API
      // const dndOrderedColumnIds = dndOrderedColumns.map(column => column._id)
      // console.log( 'New Column Order Ids:', dndOrderedColumnIds)

      // Cập nhật lại state column ban đầu sau khi đã kéo thả xong
      setOrderedColumnsState(dndOrderedColumns)
    }
  }

  return (
    <DndContext onDragEnd={ handleDragEnd } sensors={ sensors }>
      {/* Container để của phần board content, là phần tử cha to nhất, để chỉnh padding và margin cho toàn bộ phần content, tránh việc phải chỉnh cho từng phần tử con bên trong */}
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        // Dùng bản sử dụng tạo ra bộ cơ sở trên theme.js
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        {/* Box chứa list các columns */}
        <ListColumns columns= { orderedColumnsState }/>
      </Box>
    </DndContext>
  )
}

export default BoardContent

// L : useEffect ở đây có nhiệm vụ là khi component BoardContent nhận được props board mới (ví dụ khi người dùng chuyển sang một board khác), thì nó sẽ sắp xếp lại thứ tự các column của board đó theo đúng thứ tự đã lưu trong columnOrderIds của board, và cập nhật lại state orderedColumnsState để component ListColumns có thể render lại với thứ tự column mới. Nếu không có useEffect này, thì khi người dùng chuyển sang một board khác, thứ tự các column có thể bị sai so với thứ tự đã lưu trong columnOrderIds của board đó.

// L : active là column đang được kéo, over là column bị đè lên khi kéo.