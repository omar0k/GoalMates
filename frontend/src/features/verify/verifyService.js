import axios from "axios";
const API_URL = "/api/users/";

const verifyEmail = async (userData) => {
  const url = `${API_URL}${userData.id}/verify/${userData.token}`;
  const response = await axios.get(url);
};
const verifyService = {
  verifyEmail,
};
export default verifyService;
