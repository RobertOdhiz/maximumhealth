import axios from 'axios';

const BASE_URL = 'https://maxhealth-be.vercel.app/api';

const request = async (method, endpoint, body = null) => {
  const config = {
    method,
    url: `${BASE_URL}${endpoint}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: body || undefined,
  };
  const response = await axios(config);
  return response.data.data;
};

// Function to get data (only for products)
export const getData = async (sheetName) => {
  if (sheetName === "products") {
    const endpoint = `/products`;
    return await request('GET', endpoint);
  }
  throw new Error("Retrieval not allowed for this sheet.");
};

// Function to get a single record by ID
export const getById = async (sheetName, id) => {
  if (sheetName === "products") {
    const endpoint = `/products/${id}`;
    return await request('GET', endpoint);
  }
  throw new Error("Retrieval by ID is not allowed for this sheet.");
};

// Function to create a new record (only for orders)
export const createRecord = async (sheetName, data) => {
  if (sheetName === "orders") {
    const endpoint = `/orders`;
    return await request('POST', endpoint, data);
  }
  throw new Error("Creation not allowed for this sheet.");
};

// Function to update an existing record
export const updateRecord = async (sheetName, data) => {
  if (sheetName === "products") {
    const endpoint = `/products`;
    return await request('PUT', endpoint, data);
  } else if (sheetName === "orders") {
    const endpoint = `/orders`;
    return await request('PUT', endpoint, data);
  }
  throw new Error("Update not allowed for this sheet.");
};

// Function to search for products by text
export const searchProducts = async (searchText) => {
  const endpoint = `/products?search=${encodeURIComponent(searchText)}`;
  return await request('GET', endpoint);
};

// Attempting to delete a record will now throw an error
export const deleteRecord = async () => {
  throw new Error("Deletion is not allowed for any endpoint.");
};
