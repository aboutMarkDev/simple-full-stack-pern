import api from "@/config/axios";

export const currentUser = async () => {
  const { data } = await api.get("/users/currentUser");
  return data;
};

export const registerUser = async (userFormData: {
  username: string;
  password: string;
}) => {
  const { data } = await api.post("/users/register", userFormData);
  return data;
};

export const login = async (userFormData: {
  username: string;
  password: string;
}) => {
  const { data } = await api.post("/users/login", userFormData);
  return data;
};

export const logout = async () => {
  const { data } = await api.post("/users/logout");
  return data;
};
