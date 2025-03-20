import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { getRecipes } from '../apis/recipeApi';
import {
  getFavorites,
  postFavorite,
  deleteFavorite,
} from '../apis/favoritesApi';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router';
import Pagination from '../components/Pagination';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

  const currentRecipes = recipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  async function fetchRecipes() {
    const fetchedRecipes = await getRecipes();
    setRecipes(fetchedRecipes);
  }

  async function fetchFavorites() {
    const fetchedFavorites = await getFavorites(user.id);
    setFavorites(fetchedFavorites);
  }

  useEffect(() => {
    fetchRecipes();
    fetchFavorites();
  }, []);

  async function handleFavoriteToggle(recipe) {
    const existingFavorite = favorites.find(
      (fav) => fav.recipe.id === recipe.id
    );
    if (!existingFavorite) {
      const newFavorite = await postFavorite(user.id, recipe);
      if (newFavorite) {
        setFavorites((prevFavorites) => [
          ...prevFavorites,
          newFavorite,
        ]);
      }
    } else {
      await deleteFavorite(existingFavorite.id);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.recipe.id !== recipe.id)
      );
    }
  }

  const handleRecipeClick = (recipeId) => {
    navigate(`/dashboard/recipe/${recipeId}`);
  };

  return (
    <main className="main">
      <h1 className="heading">Recipe List</h1>
      <div className="p-4 white shadow rounded-lg">
        <ul className="space-y-3">
          {currentRecipes.map((recipe) => (
            <li
              key={recipe.id}
              onClick={() => handleRecipeClick(recipe.id)}
              className="cursor-pointer transition hover:bg-gray-100 p-3 rounded-lg shadow-sm"
            >
              <RecipeCard
                recipe={recipe}
                isFavorite={favorites.some(
                  (fav) => fav.recipe.id === recipe.id
                )}
                handleFavoriteToggle={handleFavoriteToggle}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination
          postsPerPage={recipesPerPage}
          totalPosts={recipes.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </main>
  );
}
