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
  const navigate = useNavigate();

  const toDash = () => {
    sessionStorage.setItem("dash", true);
  };
  const quitDash = () => {
    sessionStorage.removeItem("dash");
  };

  const updateUserData = (userData) => {
    setUser(userData);
    saveUserDataToLocalStorage(userData);
  };

  const register = async (data) => {
    try {
      await axios.post("http://localhost:4000/auth/register", data);
      navigate("/login");
    } catch (error) {
      return error;
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
      value={{
        user,
        loggedIn: !!user,
        register,
        login,
        logout,
        toDash,
        quitDash,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, AuthContext, useAuth };
