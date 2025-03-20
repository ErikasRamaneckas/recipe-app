import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getUser(id) {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserByUsername(username) {
  try {
    const response = await axios.get(
      `${BASE_URL}/users?username=${username}`
    );

    if (response.data.length > 0) {
      const user = response.data[0];
      return user;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function postUser(postObj) {
  try {
    const response = await axios.post(`${BASE_URL}/users`, postObj);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function validateLogin(username, password) {
  try {
    const response = await axios.get(
      `${BASE_URL}/users?username=${username}&password=${password}`,
      {
        username,
        password,
      }
    );

    console.log(response.data[0]);

    if (response.data.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Login error:', error);
  }
}
