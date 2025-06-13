import {api} from "../axios/axios.config"
const token = localStorage.getItem("token");

export const getUserProfile = () =>
  api.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
