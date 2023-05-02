export function generateOrderCode(orderCount) {
  const prefix = "SH";
  const count = String(orderCount + 1).padStart(2, "0");
  const date = new Date();
  const dateString = [
    String(date.getDate()).padStart(2, "0"),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getFullYear()).substring(2, 4),
  ].join("");

  return `${prefix}${count}${dateString}`;
}
