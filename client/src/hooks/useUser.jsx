import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useUser = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [itemObjects, setItemObjects] = useState({});

  const homepageGetServices = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/user`
      );
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const userGetServices = async (query) => {
    try {
      let queryParams = "";
      if (query) {
        const { search, category_id, minPrice, maxPrice, sortBy } = query;
        queryParams = `?keywords=${search}&category_id=${category_id}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortBy=${sortBy}`;
      }
      console.log(queryParams);
      const response = await axios.get(
        `http://localhost:4000/user/services` + queryParams
      );
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
  };
};

export default useUser;
