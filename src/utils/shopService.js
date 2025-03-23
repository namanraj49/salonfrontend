import axios from 'axios';
const API_URL = 'http://172.20.10.3:3000/users/shopProfile'; 
export const getShopProfile = async (shopId) => {
  try {
    if (!shopId) {
      throw new Error("❌ shopId is required to fetch shop profile.");
    }

    const requestUrl = `${API_URL}?shopId=${shopId}`;
    console.log("✅ Fetching from:", requestUrl); // Debugging log

    const response = await axios.get(requestUrl);
    console.log("✅ API Response:", response.data); // Debugging log

    return response.data;
  } catch (error) {
    console.error("❌ Error fetching shop profile:", error);
    throw error;
  }
};
