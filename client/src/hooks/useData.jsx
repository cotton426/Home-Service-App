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
    }
  };

  const addCategory = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/data/categories",data);
      navigate("/categories")
    } catch (error) {
      console.error(error);
      return error
    }
  };

  const getServices = async () => {
    try {
      const response = await axios.get("http://localhost:4000/data/services");
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addService = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/data/services",data);
    } catch (error) {
      console.error(error);
    }
  };




  return { items, getCategories, addCategory, getServices, addService};
};

export default useData;
