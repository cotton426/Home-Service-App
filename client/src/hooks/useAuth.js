import { useQuery, useMutation } from "react-query";
import axios from "axios";

const loginUser = async ({ email, password }) => {
  const response = await axios.post("http://localhost:4000/auth/login", {
    email,
    password,
  });
  return response.data;
};

const registerUser = async (data) => {
  await axios.post("http://localhost:4000/auth/register", data);
};

const logoutUser = async () => {
  await axios.post("http://localhost:4000/auth/logout");
};

export const useLogin = () => {
  return useMutation(loginUser);
};

export const useRegister = () => {
  return useMutation(registerUser);
};

export const useLogout = () => {
  return useMutation(logoutUser);
};
