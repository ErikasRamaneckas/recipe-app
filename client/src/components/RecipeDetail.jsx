import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getRecipe } from '../apis/recipeApi';

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecipe(id);
      console.log(data);
      if (data) setRecipe(data);
    };
    fetchData();
  }, []);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-64 h-64 object-cover rounded-md mx-auto"
      />
      <h1 className="text-3xl font-bold text-center mt-4">
        {recipe.name}
      </h1>

      <div className="mt-6">
        <p className="text-lg">
          Rating:{' '}
          <span className="font-semibold">{recipe.rating}</span>
        </p>
        <p className="text-lg">
          Review count:{' '}
          <span className="font-semibold">{recipe.reviewCount}</span>
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Tags</h2>
        <ul className="list-inside pl-4 mt-2">
          {recipe.tags.map((tag, index) => (
            <li key={index} className="text-lg my-2">
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Meal Type</h2>
        <ul className="list-inside pl-4 mt-2">
          {recipe.mealType.map((mealType, index) => (
            <li key={index} className="text-lg my-2">
              {mealType}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <p className="text-lg">
          Prep time (minutes):{' '}
          <span className="font-semibold">
            {recipe.prepTimeMinutes}
          </span>
        </p>
        <p className="text-lg">
          Cook time (minutes):{' '}
          <span className="font-semibold">
            {recipe.cookTimeMinutes}
          </span>
        </p>
        <p className="text-lg">
          Servings:{' '}
          <span className="font-semibold">{recipe.servings}</span>
        </p>
        <p className="text-lg">
          Difficulty:{' '}
          <span className="font-semibold">{recipe.difficulty}</span>
        </p>
        <p className="text-lg">
          Cuisine:{' '}
          <span className="font-semibold">{recipe.cuisine}</span>
        </p>
        <p className="text-lg">
          Calories per serving:{' '}
          <span className="font-semibold">
            {recipe.caloriesPerServing}
          </span>
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Ingredients</h2>
        <ul className="list-disc pl-6 mt-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-lg my-2">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Instructions</h2>
        <ol className="list-decimal pl-6 mt-2">
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className="text-lg my-2">
              {instruction}
            </li>
          ))}
        </ol>
      </div>

      {/* <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={toggleFavorite}
          className={`px-6 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
            isFavorite
              ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500'
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500'
          }`}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div> */}
    </div>
  );
}
