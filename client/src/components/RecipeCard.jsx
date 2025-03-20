export default function RecipeCard({
  recipe,
  handleFavoriteToggle,
  isFavorite,
}) {
  const handleClick = (e) => {
    e.stopPropagation();
    handleFavoriteToggle(recipe);
  };

  return (
    <div className="flex items-center space-x-2">
      <img
        src={recipe.image}
        className="w-16 h-16 rounded-full border border-gray-300"
      />
      <span>{recipe.name}</span>
      <button
        type="button"
        onClick={handleClick}
        className={`p-2 rounded-lg ${
          isFavorite ? 'bg-red-500' : 'bg-gray-200'
        } text-white`}
      >
        {isFavorite ? 'Remove' : 'Add'}
      </button>
    </div>
  );
}
