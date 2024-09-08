// apiService.js
const BASE_URL = "https://script.google.com/macros/s/AKfycbzj4GdlOYKzVmfLeyEVhVcLCJwmCVzm3qSG8FEvHYiz4qtl52ehRyhxCObEgqRioa-KsA/exec"

// Utility function to handle HTTP requests
const request = async (method, endpoint, body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await response.json();
  return data;
};

// Function to get data from a sheet
export const getData = async (sheetName) => {
  const endpoint = `?sheet=${sheetName}`;
  return await request('GET', endpoint);
};

// Function to create a new record
export const createRecord = async (sheetName, data) => {
  const endpoint = `?sheet=${sheetName}`;
  return await request('POST', endpoint, data);
};

// Function to update an existing record
export const updateRecord = async (sheetName, data) => {
  const endpoint = `?sheet=${sheetName}`;
  return await request('PUT', endpoint, data);
};

// Function to delete a record
export const deleteRecord = async (sheetName, id) => {
  const endpoint = `?sheet=${sheetName}&id=${id}`;
  return await request('DELETE', endpoint);
};
