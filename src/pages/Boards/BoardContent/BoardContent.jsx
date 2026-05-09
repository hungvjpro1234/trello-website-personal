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
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
  closestCenter
} from '@dnd-kit/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep, last, set } from 'lodash'

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

  // state sinh ra chỉ để lưu lại column khi bắt đầu kéo ở onDragStart ( chỉ áp dụng kéo thả card )
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  // Điểm va chạm cuối cùng trước đó ( xử lý thuật toán phát hiện va chạm )
  const lastOverId = useRef(null)

  // Sử dụng useEffect để sắp xếp lại thứ tự các column khi nhận được props board mới
  useEffect(() => {
    // Sắp xếp lại thứ tự các column theo đúng thứ tự đã lưu trong columnOrderIds của board -> trả về 1 mảng column đã được sắp xếp theo đúng thứ tự
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumnsState(orderedColumns)
  }, [board] )

  // Tìm 1 column theo card Id
  const findColumnByCardId = (cardId) => {
    // Dùng cards để map mà không dùng cardOrderIds vì handleDragOver sẽ làm dữ liệu cho cards hoàn chỉnh trước rồi mới tạo cardOrderIds mới
    return orderedColumnsState.find(column => column?.cards?.some(card => card._id === cardId))
  }

  // function chung xử lý việc di chuyển Card giữa các Column khác nhau
  const moveCardBetweenDeifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggringCardId,
    activeDraggingCardData
  ) => {
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

        // Đối với DragEnd thì phải cập nhật chuẩn dữ liệu columnId trong card sau khi kéo card giữa 2 column khác nhau
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          // ghi đè lại columnId của activeDraggingCardData vì coulumnId của activeDraggingCardData lúc này chưa được cập nhật --> bug khi kéo thả qua lại nhiều lần giữa 2 cột
          columnId: nextOverColumn._id
        }

        // Thêm card đang kéo vào overColumn theo vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)

        // cập nhật mảng cardOrderIds cho chuẩn dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }

      return nextColumns
    })
  }

  // Trigger khi bắt đầu việc kéo (Drag) một phần tử (có thể là column hoặc card)
  const handleDragStart = (event) => {
    // console.log('handleDragStart :', event)

    setActiveDragItemId(event?.active?.id)

    // Nếu tồn tại columnId thì kiểu của phần tử đang kéo là card, ngược lại là column
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITENM_TYPE.CARD : ACTIVE_DRAG_ITENM_TYPE.COLUMN)

    setActiveDragItemData(event?.active?.data?.current)

    // chỉ áp dụng khi kéo card
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
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
      moveCardBetweenDeifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggringCardId,
        activeDraggingCardData
      )
    }
  }

  // Trigger khi kết thúc việc thả (Drop) một phần tử (có thể là column hoặc card)
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd :', event)

    const { active, over } = event

    // Nếu kéo linh tinh ra ngoài -> return luôn, tránh lỗi
    if (!active || !over) return

    // xử lý kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITENM_TYPE.CARD) {
      // activeDraggringCard là card đang được kéo
      const {
        id : activeDraggringCardId, 
        data : { current: activeDraggingCardData }
      } = active

      // overCard là card bị đè lên khi kéo
      const { id : overCardId } = over

      // Tìm 2 columns theo card Id của active và over để biết được đang kéo card từ column nào sang column nào ( tới hàm này thì sai )
      const activeColumn = findColumnByCardId(activeDraggringCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      // Kéo thả card giữa 2 column khác nhau.
      // Trạng thái UI đã được cập nhật tạm thời ở onDragOver rồi, nên tới DragEnd chỉ cần chốt logic/API nếu có.
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDeifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggringCardId,
          activeDraggingCardData
        )
      }

      // kéo thả card trong cùng một column
      // logic tương tự kéo thả Column trong một boadContent
      else {
        // Tìm và lấy ví trí cũ của card được kéo ( từ oldColumnWhenDraggingCard )
        const oldCardIndex = oldColumnWhenDraggingCard?.cards.findIndex(card => card._id === activeDragItemId)
        // Tìm và Lấy vị trí mới của card được kéo ( từ over )
        const newCardIndex = overColumn?.cards.findIndex(card => card._id === overCardId)

        // Sử dụng hàm arrayMove của dnd-kit để sắp xếp lại thứ tự card trong mảng orderedCardsState theo đúng thứ tự mới sau khi kéo thả ( từ oldIndex đến newIndex )
        // -> Trả về một mảng Card mới đã được sắp xếp lại theo đúng thứ tự mới sau khi kéo thả
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumnsState(prevColumns => {
          // clone mảng OrderedColumnsState cũ sang một mảng mới để tránh việc thay đổi trực tiếp vào mảng cũ ( vì mảng cũ đang được sử dụng để render giao diện) , sau khi xử lý data xong sẽ return cập nhật lại OrderedColumnsState mới để re-render giao diện
          const nextColumns = cloneDeep(prevColumns)

          // Tìm tới column chúng ta đag thả ( thực ra vẫn là column cũ vì đang xử lý trong cùng column )
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)

          // cập nhật lại card và cardOrderIds trong targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          // vì targetColumn dùng hàm find để tìm trong nextColumns nên khi targetColumn thay đổi, nextColumns cũng thay đổi theo --> ko cần set lại nextColumns
          return nextColumns
        })
      }
    }


    // xử lý kéo thả column trong một boardContent
    if (activeDragItemType === ACTIVE_DRAG_ITENM_TYPE.COLUMN) {
      // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu -> cập nhật lại thứ tự column
      if (active.id !== over.id) {
        // Tìm và lấy ví trí cũ của column được kéo ( từ active )
        const oldColumnIndex = orderedColumnsState.findIndex(column => column._id === active.id)
        // Tìm và Lấy vị trí mới của column được kéo ( từ over )
        const newColumnIndex = orderedColumnsState.findIndex(column => column._id === over.id)

        // Sử dụng hàm arrayMove của dnd-kit để sắp xếp lại thứ tự column trong mảng orderedColumnsState theo đúng thứ tự mới sau khi kéo thả ( từ oldIndex đến newIndex )
        // -> Trả về một mảng column mới đã được sắp xếp lại theo đúng thứ tự mới sau khi kéo thả
        const dndOrderedColumns = arrayMove(orderedColumnsState, oldColumnIndex, newColumnIndex)
        // console.log('DND Ordered Columns:', dndOrderedColumns)

        // Cập nhật lại phần tử columnOrderIds khi kết nối db thật khi  gọi API
        // const dndOrderedColumnIds = dndOrderedColumns.map(column => column._id)
        // console.log( 'New Column Order Ids:', dndOrderedColumnIds)

        // Cập nhật lại state column ban đầu sau khi đã kéo thả xong
        setOrderedColumnsState(dndOrderedColumns)
      }
    }

    // sau khi kết thúc việc thả thì phải reset lại các state để kết thúc vòng đời của state
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
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

  // Hàm xử lý thuật toán phát hiện va chạm (collision detection) khi kéo thả, để xác định phần tử nào đang bị đè lên (over) khi kéo phần tử khác (active)
  const collisionDetectionStrategy = useCallback((args) => {
    // Nếu là kéo thả cột, dùng closestCorners như thuật toán phát hiện va chạm mặc định của dnd-kit
    if (activeDragItemType === ACTIVE_DRAG_ITENM_TYPE.COLUMN) {
      return closestCorners(...args)
    }

    // tìm các điểm giao nhau / va chạm với con trỏ
    const pointerIntersections = pointerWithin(args)

    // thuật toán phát hiện va chạm trả về mảng các va chạm ở đây
    const intersections = pointerIntersections?.length > 0
      ? pointerIntersections
      : rectIntersection(args)

    // Tìm overId đầu tiên trong đám intersections ở trên
    let overId = getFirstCollision(intersections, 'id')

    if (overId) {
      // Ý tưởng chính đoạn này : Nếu over là column thì sẽ tìm tới cardId gần nhất bên trong khu vực va chạm đó dựa vào thuật toán phát hiện va chạm closestCorners hoặc closestCenter.
      // B1 : Tìm column có id trùng với overId 
      const intersectColumn = orderedColumnsState.find(column => column._id === overId)

      // B2 : Nếu tìm thấy column đó thì sẽ tiếp tục tìm cardId gần nhất bên trong column đó dựa vào thuật toán phát hiện va chạm closestCorners hoặc closestCenter, và gán lại overId bằng cardId đó
      if (intersectColumn) {
        // console.log('overId before: ', overId)

        overId = closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            // Loại chính cột đó ( ko quan trọng lắm, chủ yếu là để defense )
            return (container.id !== overId)
            // điều kiện chính : loại cột ko có container.id trong mảng cardOrderIds (chắc chắn chỉ có cột đang bị drop mới có container.id trong mảng cardOrderIds) -> sau check này sẽ trả ra mảng các container chỉ có các card bên trong cloumn đang xét ( ko phải tất cả card trong cardOrderIds )
              && (intersectColumn?.cardOrderIds?.includes(container.id))
          })
          // Lấy card có index 0
        })[0]?.id

        // console.log('overId after: ', overId)
      }
      lastOverId.current = overId
      return [{ id: overId }]
    }

    // Nếu OverId null thì trả về mảng rỗng - tránh bug, crash trang
    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumnsState])

  return (
    <DndContext
      // phát hiện va chạm ( dùng closestCorners bị lỗi flickering )
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}

      // Cảm biến
      sensors={ sensors }

      // Các hàm xử lý sự kiện kéo thả
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
            <Column column={activeDragItemData} dndDisabled />
          }

          {/* Lớp phủ khi bắt đầu kéo(drag), sẽ render ra 1 card mờ mờ (content giống hệt card đang kéo), mất khi drop */}
          {(activeDragItemType === ACTIVE_DRAG_ITENM_TYPE.CARD) &&
            <Card card={activeDragItemData} dndDisabled />
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

// L : (68) : khi xử lý kéo Card, ở handleDragEnd không thể sử dụng trực tiếp activeColumn vì state orderedColumnsState đã bị thay đổi ngay trong handleDragOver --> activeColumn lúc này bên trong active ở handleDragEnd không còn đúng ý nghĩa ban đầu ( card này xuất phát từ cột nào ) --> phải tạo lại 1 state chỉ lưu trạng thái của column trước khi card được kéo đi để thực hiện thay đổi khi xử lý tới handleDragEnd chính là state oldColumnWhenDraggingCard, state này sẽ được set ở handleDragStart khi bắt đầu kéo card, và sẽ được reset lại sau khi kết thúc việc thả card ở handleDragEnd để kết thúc vòng đời của state này, tránh việc state này bị sai lệch khi kéo thả nhiều lần ( overColumn vẫn dùng được vì vốn overColumn mang ý nghĩa cột chứa card ngay trước khi drop )

// L : (223) : hàm find : khi tập con sinh ra từ hàm find thay đổi, hàm cha ( hàm gốc ban đầu ) cũng thay đổi theo

// L : (338, 343) : dndDisabled được truyền vào component Column như cờ chỉ để check true false cho phần disable của useSortable, khi kéo thả column thì sẽ disable kéo thả card và ngược lại, để tránh lỗi khi kéo thả

// L : (useCallback - 348) : hàm trong React, dùng để memoize một hàm, tức là chỉ tạo lại hàm đó khi các dependencies của nó thay đổi, giúp tối ưu hiệu suất bằng cách tránh việc tạo lại hàm không cần thiết trong mỗi lần render. Trong trường hợp này, hàm collisionDetectionStrategy được memoize bằng useCallback để đảm bảo rằng nó chỉ được tạo lại khi activeDragItemType thay đổi ( khi đổi kiểu kéo thả từ column sang card hoặc ngược lại )