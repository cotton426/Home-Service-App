import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const saveUserDataToLocalStorage = (userData) => {
  localStorage.setItem("userData", JSON.stringify(userData));
};

const loadUserDataFromLocalStorage = () => {
  const userDataString = localStorage.getItem("userData");
  return userDataString ? JSON.parse(userDataString) : null;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadUserDataFromLocalStorage());
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const updateUserData = (userData) => {
    setUser(userData);
    saveUserDataToLocalStorage(userData);
  };

  const register = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/register",
        data
      );
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });
      updateUserData(response.data);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Incorrect email or password.");
        return error;
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:4000/auth/logout");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loggedIn: !!user, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, AuthContext, useAuth };
