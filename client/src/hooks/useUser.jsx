import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useUser = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [itemObjects, setItemObjects] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const homepageGetServices = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/user`);
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const userGetServices = async (query) => {
    try {
      const keywords = query?.search;
      // let queryParams = "";
      // console.log(Boolean(query));
      // if (query) {
      //   const { search, category_id, minPrice, maxPrice, sortBy } = query;
      //   queryParams = `?keywords=${search}&category_id=${category_id}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortBy=${sortBy}`;
      // }
      // console.log(queryParams);
      const response = await axios.get(
        `http://localhost:4000/user/services?keywords=${keywords}`
      );
      console.log(response.data);
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const submitBooking = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/user/orders",
        formData
      );
      return { success: true, message: "Booking submitted successfully!" };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Failed to submit the booking. Please try again.",
      };
    }
  };

  const getOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:4000/user/orders");
      setItems(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  return {
    items,
    itemObjects,
    userGetServices,
    homepageGetServices,
    isLoading,
    error,
    submitBooking,
    getOrders,
  };
};

export default useUser;
