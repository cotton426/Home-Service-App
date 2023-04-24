import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useData = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([])



  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:4000/data/categories");
      setItems(response.data);
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };

  const addCategories = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/data/categories",data);
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };

  const getServices = async () => {
    try {
      const response = await axios.get("http://localhost:4000/data/services");
      return response.data;
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };


  return { items, getCategories, addCategories, getServices};
};

export default useData;
