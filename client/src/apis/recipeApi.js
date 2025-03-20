import axios from 'axios';

const BASE_URL = import.meta.env.VITE_RECIPE_API_BASE_URL;

export async function getRecipes() {
  try {
    const response = await axios.get(`${BASE_URL}/recipes`);
    return response.data.recipes;
  } catch (error) {
    console.error(error);
  }
}

export async function getRecipe(id) {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
