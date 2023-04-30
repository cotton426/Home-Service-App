import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    profile_id: "",
    status: "",
    total_price: "",
    address: "",
    booking_date: "",
    booking_time: "",
    staff_id: "",
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/user/orders",
        formData
      );
      // Handle the response, e.g., show a success message or navigate to another page
      setSuccessMessage("Booking submitted successfully!");
      setTimeout(() => {
        navigate("/service"); // Change this to the desired path after successful submission
      }, 2000);
    } catch (error) {
      console.error(error);
      // Handle the error, e.g., show an error message to the user
      setError("Failed to submit the booking. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <h2>Home Service Booking</h2>
      <label>
        Profile ID:
        <input
          type="text"
          name="profile_id"
          value={formData.profile_id}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Status:
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Total Price:
        <input
          type="number"
          name="total_price"
          value={formData.total_price}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Booking Date:
        <input
          type="date"
          name="booking_date"
          value={formData.booking_date}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Booking Time:
        <input
          type="time"
          name="booking_time"
          value={formData.booking_time}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Staff ID:
        <input
          type="text"
          name="staff_id"
          value={formData.staff_id}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookingForm;
