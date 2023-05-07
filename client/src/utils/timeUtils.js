const formatTime = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = String(hours % 12 || 12).padStart(2, "0");
  
    return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;
  };
  
  export { formatTime };
  
  export const formatTimeBooking = (timeString) => {
    const [hour, minute] = timeString.split(':');
    return `${hour}.${minute}`;
  };

  export const formatDateBooking = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear() + 543; 
  
    return `${day}/${month}/${year}`;
  };
  
  