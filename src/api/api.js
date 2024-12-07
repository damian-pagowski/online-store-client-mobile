import axios from 'axios';

const BASE_URL = 'http://localhost:3030'; // 

export const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  const data = response.data;
  console.log("### PRODUCT LIST ###")

  console.log(data)
  return data;
};

export const getProductDetails = async (productId) => {
    console.log("### REQ PRODUCT DETAILS ###" + `${BASE_URL}/products/${productId}`)

  const response = await axios.get(`${BASE_URL}/products/${productId}`);
  const data = response.data;
  console.log("### PRODUCT DETAILS ###")

  console.log(data)
  return data;};

export const addToCart = async (productId) => {
  const response = await axios.post(`${BASE_URL}/cart`, { productId, quantity: 1 });
  const data = response.data;
  console.log("### ADD TO CART ###")

  console.log(data)
  return data;
};