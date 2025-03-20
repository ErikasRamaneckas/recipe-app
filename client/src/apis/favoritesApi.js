import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getFavorites(userId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/favorites?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function postFavorite(userId, recipe) {
  try {
    const response = await axios.post(`${BASE_URL}/favorites`, {
      userId: userId,
      recipe: recipe,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteFavorite(favoriteId) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/favorites/${favoriteId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
