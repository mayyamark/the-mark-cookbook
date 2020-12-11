import { useState } from 'react';
import AddImages from '../AddImages/AddImages';
import RemoveImages from '../RemoveImages/RemoveImages';
import UpdateRecipe from '../UpdateRecipe/UpdateRecipe';

const SingleRecipe = ({ recipe, categories, measures, updateRecipe, addImages, removeImages }) => {
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
  const [removingImages, setRemovingImages] = useState(false);

  return (
    <>
      {updating ? (
        <UpdateRecipe recipe={recipe} categories={categories} measures={measures} sendRecipe={updateRecipe} />
      ) : addingImages ? (
        <AddImages sendImages={addImages} close={setAddingImages} />
      ) : removingImages ? (
        <RemoveImages
          recipeImages={images}
          removeImages={removeImages}
          close={setRemovingImages}
        />
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
          {recipe.images.length > 0 && <button onClick={() => setRemovingImages((prevState) => !prevState)}>
            Премахни снимки
          </button>}
        </>
      )}
    </>
  );
};

export default SingleRecipe;
