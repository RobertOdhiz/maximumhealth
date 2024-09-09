import axios from 'axios';

const BASE_URL = 'https://script.google.com/macros/s/AKfycbxotnAcw4IsOudO3ZnroOs_mJigvAM4Xu9f3Zq9kyyTpsZQRlJt-p0kAf96vfsQgi7QmQ/exec';

const request = async (method, endpoint, body = null) => {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
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
    try {
      const response = await axios.post(`${BASE_URL}?sheet=${sheetName}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      console.error('Error creating record:', error);
      throw error;
    }
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
  