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
      navigate("/categories");
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

  const addService = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/data/services",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/services");
    } catch (error) {
      console.error(error);
      return error.response.data.error
    }
    
  };

  const getService = async (param) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/data/services/" + param
      );
      const { services } = response.data[0];
      const result = response.data.map((item) => {
        delete item.services;
        return item;
      });
      services.subServiceList = result;
      setItemObjects(services);
    } catch (error) {
      console.error(error);
    }
  };

  const editService = async (param, formData) => {
    try {
      const response = await axios.put(
        "http://localhost:4000/data/services/" + param,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/services");
    } catch (error) {
      console.error(error);
      return error.response.data.error
    }
  };

  const deleteService = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/data/services/${id}`
      );
      navigate("/services");
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
    getService,
    editService,
    deleteService,
  };
};

export default useData;
