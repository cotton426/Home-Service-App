import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useUser = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [itemObjects, setItemObjects] = useState({});

  const userGetServices = async (query) => {
    try {
      const response = await axios.get("http://localhost:4000/user/services");
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  return {
    items,
    itemObjects,
    userGetServices,
  };
};

export default useUser;
