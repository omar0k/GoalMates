import axios from "axios";

const API_URL = "/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  // if (response.data) {
  //   localStorage.setItem("user", JSON.stringify(response.data));
  // }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    console.log("response", response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};
const verify = async (userData) => {
  const url = `${API_URL}${userData.id}/verify/${userData.token}`;
  console.log(url);
  const response = await axios.get(url);
  if (response.data) {
    console.log(response.data);
  }
};
// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  verify,
};

export default authService;
