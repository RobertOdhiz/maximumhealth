const BASE_URL = 'https://script.google.com/macros/s/AKfycbxv8Bladn_zwdo_Sp4T31Awu89osRUtFMtDYSY34r4ew13YV0o-YjzYU5CQohGWWUZkdg/exec';

const request = async (method, endpoint, body = null) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
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
  const endpoint = `?sheet=${sheetName}&uuid=${id}`;
  return await request('DELETE', endpoint);
};
