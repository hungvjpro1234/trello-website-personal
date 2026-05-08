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
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep } from 'lodash'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

// Sử dụng trong handleDragStart ( xử lý vấn đề chỉ duy nhất một phần tử được kéo thả tại một thời điểm, nếu kéo thả column thì không thể kéo thả card và ngược lại, để tránh lỗi khi kéo thả )
const ACTIVE_DRAG_ITENM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

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

  // const [orderedColumns, setOrderedColumns] = useState([])

  // Cùng một thời điểm chỉ có 1 phần từ đang được kéo (column hoặc card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)

  const [activeDragItemType, setActiveDragItemType] = useState(null)

  const [activeDragItemData, setActiveDragItemData] = useState(null)

  // Sử dụng useEffect để sắp xếp lại thứ tự các column khi nhận được props board mới
  useEffect(() => {
    // Sắp xếp lại thứ tự các column theo đúng thứ tự đã lưu trong columnOrderIds của board -> trả về 1 mảng column đã được sắp xếp theo đúng thứ tự
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumnsState(orderedColumns)
  }, [board] )

  // Tìm 1 column theo card Id
  const findColumnByCardId = (cardId) => {
    // Dùng cards để map mà không dùng cardOrderIds vì handleDragOver sẽ làm dữ liệu cho cards hoàn chỉnh trước rồi mới tạo cardOrderIds mới
    return orderedColumnsState.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  // Trigger khi bắt đầu việc kéo (Drag) một phần tử (có thể là column hoặc card)
  const handleDragStart = (event) => {
    // console.log('handleDragStart :', event)

    setActiveDragItemId(event?.active?.id)

    // Nếu tồn tại columnId thì kiểu của phần tử đang kéo là card, ngược lại là column
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITENM_TYPE.CARD : ACTIVE_DRAG_ITENM_TYPE.COLUMN)

    setActiveDragItemData(event?.active?.data?.current)
  }

  // Trigger trong quá trình kéo thả khi phần tử đang được kéo đi qua một phần tử khác (over)
  const handleDragOver = (event) => {
    // console.log('handleDragOver :', event)

    // Ko động tới column trong phần này vì start với end là đủ với column rồi
    if (activeDragItemType === ACTIVE_DRAG_ITENM_TYPE.COLUMN) return

    // Nếu kéo thả card qua lại giữa các column thì xử lý thêm ở tất cả các phần dưới đây
    const { active, over } = event

    // Nếu kéo linh tinh ra ngoài -> return luôn, tránh lỗi, active tương tự
    if (!active || !over) return

    // activeDraggringCard là card đang được kéo
    const {
      id : activeDraggringCardId, 
      data : { current: activeDraggingCardData }
    } = active

    // overCard là card bị đè lên khi kéo
    const { id : overCardId } = over

    // Tìm 2 columns theo card Id của active và over để biết được đang kéo card từ column nào sang column nào
    const activeColumn = findColumnByCardId(activeDraggringCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    // chỉ xử lý khi kéo từ column này và thả ở column khác, cùng coulmn thì ko xử lý ( hàm chỉ xử lý trong handleDragOver )
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumnsState(prevColumns =>{
        // Tìm vị trí index của card bị đè lên (overCard) trong column mới (overColumn)
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        // Xử lý giống docs của Dnd-kit, sau bước này sẽ có được VỊ TRÍ INDEX MỚI CỦA CARD sau khi kéo thả, dựa vào vị trí index của card bị đè lên (overCardIndex) và vị trí tương đối của card đang kéo so với card bị đè lên (isBelowOverItem):
        let newCardIndex
        const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        // clone mảng OrderedColumnsState cũ sang một mảng mới để tránh việc thay đổi trực tiếp vào mảng cũ ( vì mảng cũ đang được sử dụng để render giao diện) , sau khi xử lý data xong sẽ return cập nhật lại OrderedColumnsState mới để re-render giao diện
        const nextColumns = cloneDeep(prevColumns)

        // Tìm lại 2 column trong mảng mới để cập nhật lại data cho 2 column này, vì sau khi cloneDeep thì các object column trong mảng mới sẽ khác với mảng cũ, nên cần tìm lại để cập nhật data cho đúng column
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        // column cũ
        if (nextActiveColumn) {
          // xóa card ở column cũ (activeColumn) đi, vì card đang được kéo sang column mới (overColumn), nên column cũ sẽ mất đi card đó
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggringCardId)

          // cập nhật mảng cardOrderIds cho chuẩn dữ liệu
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }

        // column mới
        if (nextOverColumn) {
          // kiểm tra xem card đang kéo có tồn tại ở overColumn chưa, nếu có thì cần xóa trước
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggringCardId)

          // Thêm card đang kéo vào overColumn theo vị trí index mới
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

          // cập nhật mảng cardOrderIds cho chuẩn dữ liệu
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }

        return nextColumns
      })
    }
  }

  // Trigger khi kết thúc việc thả (Drop) một phần tử (có thể là column hoặc card)
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd :', event)

    const { active, over } = event

    if (activeDragItemType === ACTIVE_DRAG_ITENM_TYPE.CARD) {
      // console.log('Hành động kéo thả Card, tạm thời ko làm gì cả')
      return
    }

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

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }


  // console.log('activeDragItemId: ', activeDragItemId)
  // console.log('activeDragItemType: ', activeDragItemType)
  // console.log('activeDragItemData: ', activeDragItemData)

  // Xử lý animation khi thả (Drop) phần tử, ở đây sẽ làm mờ phần tử đang được kéo thả đi một chút để tạo hiệu ứng trực quan hơn khi thả phần tử đó xuống vị trí mới
  const customDropAnimation = {
    sideOffset: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext
      sensors={ sensors }
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={ handleDragEnd }
    >
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

        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}

          {/* Lớp phủ khi bắt đầu kéo(drag), sẽ render ra 1 column mờ mờ (content giống hệt column đang kéo), mất khi drop */}
          {(activeDragItemType === ACTIVE_DRAG_ITENM_TYPE.COLUMN ) &&
            <Column column={activeDragItemData} />
          }

          {/* Lớp phủ khi bắt đầu kéo(drag), sẽ render ra 1 card mờ mờ (content giống hệt card đang kéo), mất khi drop */}
          {(activeDragItemType === ACTIVE_DRAG_ITENM_TYPE.CARD) &&
            <Card card={activeDragItemData} />
          }
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent

// L : useEffect ở đây có nhiệm vụ là khi component BoardContent nhận được props board mới (ví dụ khi người dùng chuyển sang một board khác), thì nó sẽ sắp xếp lại thứ tự các column của board đó theo đúng thứ tự đã lưu trong columnOrderIds của board, và cập nhật lại state orderedColumnsState để component ListColumns có thể render lại với thứ tự column mới. Nếu không có useEffect này, thì khi người dùng chuyển sang một board khác, thứ tự các column có thể bị sai so với thứ tự đã lưu trong columnOrderIds của board đó.


// L : active là column đang được kéo, over là column bị đè lên khi kéo.


// L ( 152 ) : Cách dùng toán tử && thay cho if để render điều kiện trong React, a && <b /> tương đương với if (a) { return <b /> } else { return null } --> nếu điều kiện a thì render component b, ngược lại không render gì cả ( return null )
// Ví dụ :
// {!activeDragItemType && null}
//      tương đương với
// if (!activeDragItemType) {
//   return null
// }
//
// {(activeDragItemType === ACTIVE_DRAG_ITENM_TYPE.COLUMN ) &&
//   <Column column={activeDragItemData} />
// }
//      tương đương với
// if (activeDragItemType === ACTIVE_DRAG_ITENM_TYPE.COLUMN) {
//   return <Column column={activeDragItemData} />
// }


// L : DragOverlay là một component đặc biệt của dnd-kit, nó sẽ hiển thị phần tử đang được kéo (active) ở một vị trí cố định trên màn hình, không bị ảnh hưởng bởi layout của các phần tử khác, giúp cho việc kéo thả được mượt mà hơn và tránh bị lỗi khi kéo thả. Khi sử dụng DragOverlay, bạn có thể render phần tử đang được kéo (active) một cách tùy chỉnh, ví dụ như thay đổi style, thêm hiệu ứng, hoặc hiển thị thông tin chi tiết về phần tử đó. Trong trường hợp này, khi activeDragItemType là COLUMN thì sẽ render component Column với dữ liệu của column đang được kéo (activeDragItemData) bên trong DragOverlay để hiển thị phần tử column đang được kéo một cách tùy chỉnh.
// Nói dễ hiểu thì DragOverlay là một lớp để giữ chỗ khi kéo thả, nó sẽ hiển thị phần tử đang được kéo ở một vị trí cố định trên màn hình


// L : ( hàm handleDragOver - 153 ) : sau khi destructuring active, activeDraggingCardData chính là data của MỘT CARD , chính là card đang được kéo vì ở useSortable của component Card, useSortable đã nhận 2 giá trị là id: card._id và data: { ...card } nên các dữ liệu của data được đẩy vào current và Destructuring ra activeDraggingCardData -> có thể dùng activeDraggingCardData cho các tham số cần shape data là dữ liệu của Card