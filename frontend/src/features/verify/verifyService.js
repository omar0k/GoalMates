import axios from "axios";
const API_URL = "https://3.93.149.131:5000/api/users/";

const verifyEmail = async (userData) => {
  const url = `${API_URL}${userData.id}/verify/${userData.token}`;
  await axios.get(url);
};
const verifyService = {
  verifyEmail,
};
export default verifyService;
