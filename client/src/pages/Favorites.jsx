import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import RecipeCard from '../components/RecipeCard';
import RecipeList from '../components/RecipeList';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router';
import {
  getFavorites,
  postFavorite,
  deleteFavorite,
} from '../apis/favoritesApi';

export default function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const navigate = useNavigate();

  const currentRecipes = favorites.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const fetchFavorites = async () => {
    const fetchedFavorites = await getFavorites(user.id);
    setFavorites(fetchedFavorites);
  };

  useEffect(() => {
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
      <h1 className="heading">Favorite Recipes</h1>
      {favorites.length === 0 ? (
        <p>You have no favorite recipes yet.</p>
      ) : (
        <div className="p-4 white shadow rounded-lg">
          <ul className="space-y-3">
            {currentRecipes.map((favorite) => (
              <li
                key={favorite.id}
                onClick={() => handleRecipeClick(favorite.recipe.id)}
                className="cursor-pointer transition hover:bg-gray-100 p-3 rounded-lg shadow-sm"
              >
                <RecipeCard
                  recipe={favorite.recipe}
                  isFavorite={favorites.some(
                    (fav) => fav.recipe.id === favorite.recipe.id
                  )}
                  handleFavoriteToggle={handleFavoriteToggle}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-4 flex justify-center">
        <Pagination
          postsPerPage={recipesPerPage}
          totalPosts={favorites.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </main>
  );
}
