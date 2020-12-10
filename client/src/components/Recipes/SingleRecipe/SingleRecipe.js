import { useState } from 'react';
import AddImages from '../AddImages/AddImages';
import UpdateRecipe from '../UpdateRecipe/UpdateRecipe';

const SingleRecipe = ({ recipe, updateRecipe, addImages }) => {
  const {
    recipeName,
    addDate,
    category,
    ingredients,
    instructions,
    images,
    isDeleted,
  } = recipe;

  const [updating, setUpdating] = useState(false);
  const [addingImages, setAddingImages] = useState(false);

  return (
    <>
      {updating ? (
        <UpdateRecipe recipe={recipe} sendRecipe={updateRecipe} />
      ) : addingImages ? (
        <AddImages sendImages={addImages} close={setAddingImages} />
      ) : (
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
                src={`http://localhost:5000/images/${image.imageName}`}
                alt="image"
              />
            ))}
          </div>
          <p>{instructions}</p>
          <button onClick={() => setUpdating((prevState) => !prevState)}>
            Промени
          </button>
          <button onClick={() => setAddingImages((prevState) => !prevState)}>
            Добави снимки
          </button>
        </>
      )}
    </>
  );
};

export default SingleRecipe;
