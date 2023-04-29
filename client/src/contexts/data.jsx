// import React, { createContext, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const DataContext = createContext();

// const DataProvider = ({ children }) => {
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();

//   const getCategories = async () => {
//     const response = await axios.get("http://localhost:4000/data/categories");
//     return response.data;
//   };
//   const addCategories = async (data) => {
//     const response = await axios.post("http://localhost:4000/data/categories");
//     return response.data;
//   };
//   const getServices = async () => {
//     const response = await axios.get("http://localhost:4000/data/services");
//     return response.data;
//   };

//   return (
//     <DataContext.Provider value={{ getCategories }}>
//       {children}
//     </DataContext.Provider>
//   );
// };
// const useData = () => useContext(DataContext);

// export { DataProvider, DataContext, useData };
