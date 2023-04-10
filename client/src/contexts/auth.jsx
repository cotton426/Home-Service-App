import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = React.createContext();

const saveUserDataToLocalStorage = (userData) => {
  localStorage.setItem("userData", JSON.stringify(userData));
};

const loadUserDataFromLocalStorage = () => {
  const userDataString = localStorage.getItem("userData");
  return userDataString ? JSON.parse(userDataString) : null;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadUserDataFromLocalStorage());
  const [loggedIn, setLoggedIn] = useState(!!user);
  const navigate = useNavigate();

  const register = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/register",
        data
      );
      const userData = response.data;

      setUser(userData);
      setLoggedIn(true);

      saveUserDataToLocalStorage(userData);

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });

      const userData = response.data;

      setUser(userData);
      setLoggedIn(true);

      saveUserDataToLocalStorage(userData);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post("http://localhost:4000/auth/logout");

      setUser(null);
      setLoggedIn(false);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loggedIn, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, AuthContext, useAuth };
