import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
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
  const queryClient = useQueryClient();

  const updateUserData = (userData) => {
    setUser(userData);
    saveUserDataToLocalStorage(userData);
  };

  const registerMutation = useMutation(
    async (data) => {
      const response = await axios.post("http://localhost:4000/auth/register", data);
      return response.data;
    },
    {
      onSuccess: () => {
        navigate("/login");
      },
    }
  );

  const loginMutation = useMutation(
    async ({ email, password }) => {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        updateUserData(data);
        navigate("/");
      },
    }
  );

  const logoutMutation = useMutation(
    async () => {
      await axios.post("http://localhost:4000/auth/logout");
    },
    {
      onSuccess: () => {
        setUser(null);
        queryClient.invalidateQueries("user");
        navigate("/");
      },
    }
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        loggedIn: !!user,
        register: registerMutation.mutate,
        login: loginMutation.mutate,
        logout: logoutMutation.mutate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, AuthContext, useAuth };
