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

  return {
    items,
    itemObjects,
    userGetServices,
    homepageGetServices,
    isLoading,
    error,
  };
};

export default useUser;
