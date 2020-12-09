import { useState } from 'react';
import CreateRecipe from '../CreateRecipe/CreateRecipe';
import AllRecipesview from './AllRecipesView';

const AllRecipes = ({ recipes, createRecipe }) => {
  const [creating, setCreating] = useState(false);

  return (
    <>
      {creating ? (
        <CreateRecipe sendRecipe={createRecipe} />
      ) : (
        <>
          <button onClick={() => setCreating((prevState) => !prevState)}>
            Добави рецепта
          </button>

          {recipes.available ? (
            <>
              <ul>
                {recipes.available.map((recipe) => (
                  <AllRecipesview key={recipe.recipeID} recipe={recipe} />
                ))}
              </ul>
              <ul>
                {recipes.deleted.map((recipe) => (
                  <AllRecipesview key={recipe.recipeID} recipe={recipe} />
                ))}
              </ul>
            </>
          ) : (
            <ul>
              {recipes.map((recipe) => (
                <AllRecipesview key={recipe.recipeID} recipe={recipe} />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};

export default AllRecipes;
