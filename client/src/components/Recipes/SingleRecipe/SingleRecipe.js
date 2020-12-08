const SingleRecipe = ({ recipe }) => {
  const {
    recipeName,
    addDate,
    category,
    ingredients,
    instructions,
    images,
    isDeleted,
  } = recipe;
  return (
    <>
      <p>{recipeName}</p>
      <p>{isDeleted ? 'Hidden' : null}</p>
      <p>{addDate}</p>
      <p>{category}</p>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.recipeIngredientID}>
            {ingredient.amount} {ingredient.measure} {ingredient.ingredient}
          </li>
        ))}
      </ul>
      <div>
        {images.map((image) => (
          <img
            key={image.imageID}
            src={
              require(`../../../../../server/images/${image.imageName}`).default
            }
            alt="image"
          />
        ))}
      </div>
      <p>{instructions}</p>
    </>
  );
};

export default SingleRecipe;
