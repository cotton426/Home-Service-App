import { useState, useEffect, useCallback } from "react";
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
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const submitBooking = async (formData) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:4000/user/orders",
  //       formData
  //     );
  //     return { success: true, message: "Booking submitted successfully!" };
  //   } catch (error) {
  //     console.error(error);
  //     return {
  //       success: false,
  //       message: "Failed to submit the booking. Please try again.",
  //     };
  //   }
  // };

  const getOrders = useCallback(
    async (profile_id) => {
      try {
        const response = await axios.get(
          `http://localhost:4000/user/orders?profile_id=${profile_id}`
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
    [setItems, axios]
  );

  const addOrder = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/user/orders",
        formData
      );
      return { success: true, message: "Add Order successfully!" };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Failed Add Order. Please try again.",
      };
    }
  };

  const checkPromotion = async (promotionCode) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/user/check-promotion",
        { promotionCode }
      );
      console.log(promotionCode);
      console.log(response?.data);
      return {
        ...response?.data,
        valid: response?.data.valid ?? false,
        discount: response?.data.discount,
        message: response?.data.message,
        type: response?.data.type,
      };
    } catch (error) {
      console.error(error);
      console.log(error);
      return {
        valid: false,
        discount: 0,
        message: error.response?.message,
        //  || "กรุณากรอกโปรโมชั่นใหม่อีกครั้งค่ะ"
      };
    }
  };

  return {
    items,
    itemObjects,
    userGetServices,
    homepageGetServices,
    isLoading,
    error,
    getOrders,
    addOrder,
    checkPromotion,
  };
};

export default useUser;
