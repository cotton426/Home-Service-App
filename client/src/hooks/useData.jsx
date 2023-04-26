import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useData = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [itemObjects, setItemObjects] = useState({});

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:4000/data/categories");
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategory = async (param) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/data/categories/" + param
      );
      setItemObjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addCategory = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/data/categories",
        data
      );
      navigate("/categories");
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const editCategory = async (param, data) => {
    try {
      const response = await axios.put(
        "http://localhost:4000/data/categories/" + param,
        data
      );
      navigate("/categories");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategory = async (param) => {
    try {
      const response = await axios.delete(
        "http://localhost:4000/data/categories/" + param
      );
     
      console.log(param);
    } catch (error) {
      console.error(error);
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
      const response = await axios.post(
        "http://localhost:4000/data/services",
        data
      );
    } catch (error) {
      console.error(error);
    }
  };

  return {
    items,
    getCategories,
    addCategory,
    getServices,
    addService,
    getCategory,
    itemObjects,
    editCategory,
    deleteCategory,
  };
};

export default useData;
