import axios from "axios";
const API_URL = "/api/users/pact";

const addToPact = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, userData, config);
  if (response.data) {
    return response.data;
  }
};
const emailPact = async (pactMembers, userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const data = { pactMembers: pactMembers, userData: userData };
  const response = await axios.post(API_URL, data, config);
  if (response.data) {
    console.log(response.data);
  }
};
const getPact = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  if (response.data) {
    return response.data;
  }
};
// Remove member from pact

const removeFromPact = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL, userData, config);
  if (response.data) {
    return response.data;
  }
};

const pactService = {
  addToPact,
  removeFromPact,
  getPact,
  emailPact,
};
export default pactService;
