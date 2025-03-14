import axios from 'axios';

const API_URL = 'http://172.20.10.3:3000/users/shopProfile'; // Change this to your actual backend URL

export const getShopProfile = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Returns shop profile details
  } catch (error) {
    console.error("Error fetching shop profile:", error);
    throw error;
  }
};
