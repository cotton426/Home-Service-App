export function generateOrderCode(orderCount,date) {
  const prefix = "SH";
  const count = orderCount > 8 ? String(orderCount + 1) : String(orderCount + 1).padStart(2, "0")
  const dateString = date.split("-").reverse().map(item=> {
    if (item>2000) {
      item -= 2000
    }
    return item
  }).join("")


  return `${prefix}${count}${dateString}`;
}
