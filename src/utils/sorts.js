// Sắp xếp các phần tử trong mảng theo thứ tự của một mảng khác (tham chiếu)
export const mapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray || !key) return []

  return [...originalArray].sort((a, b) => orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]))

  // const clonedArray = [...originalArray]
  // // Sắp xếp clonedArray dựa trên vị trí của phần tử trong orderArray, sử dụng key để so sánh
  // const orderedArray = clonedArray.sort((a, b) => {
  //   return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
  // })

  // return orderedArray
}

// Example usage:
// const originalArray = [
//   { id: 'card-id-03', title: 'Card 3' },
//   { id: 'card-id-01', title: 'Card 1' },
//   { id: 'card-id-02', title: 'Card 2' }
// ]
// const orderArray = ['card-id-02', 'card-id-01', 'card-id-03']
// const sortedArray = mapOrder(originalArray, orderArray, 'id')
// console.log(sortedArray)

// Output:
// [
//   { id: 'card-id-02', title: 'Card 2' },
//   { id: 'card-id-01', title: 'Card 1' },
//   { id: 'card-id-03', title: 'Card 3' }
// ]