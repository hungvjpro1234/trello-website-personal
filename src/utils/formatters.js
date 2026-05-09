// capitalize First Letter
export const capitalizeFirstLetter = (string) => {
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/* Xử lý bug logic thư viện Dnd-Kit khi Column rỗng
CHỈ FE có Card Placeholder, ko có trên BE
Card Placeholder là Card ẩn để giữ chỗ
Dữ liệu:
Id unique : "columnId-placeholder-card" ( 1 column tối đa 1 card )
bắt buộc : _id, boardId, columnId, FE_PlaceHolderCard */
export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceHolderCard: true
  }
}