import { useState } from 'react';
import CreateRecipe from '../CreateRecipe/CreateRecipe';
import AllRecipesview from './AllRecipesView';

const AllRecipes = ({ recipes, categories, measures, createRecipe }) => {
  const [creating, setCreating] = useState(false);
  const [recipesData, setRecipesData] = useState(recipes);

  const handleChange = (ev) => {
    if (ev.target.value === '') {
      setRecipesData(recipes);
    } else {
      if (recipesData.available) {
        const filteredAvailableRecipes = recipesData.available.filter((recipe) => recipe.recipeName.toLowerCase().includes(ev.target.value));
        const filteredDeletedRecipes = recipesData.deleted.filter((recipe) => recipe.recipeName.toLowerCase().includes(ev.target.value));
        setRecipesData([...filteredAvailableRecipes, ...filteredDeletedRecipes]);
      } else {
        const filteredRecipes = recipesData.filter((recipe) => recipe.recipeName.toLowerCase().includes(ev.target.value));
        setRecipesData(filteredRecipes);
      }
    }
  };

  return (
    <>
      {creating ? (
        <CreateRecipe categories={categories} measures={measures} sendRecipe={createRecipe} />
      ) : (
        <>
          <button onClick={() => setCreating((prevState) => !prevState)}>
            Добави рецепта
          </button>
          <div>
            <input type="text" onChange={handleChange} />
          </div>

          {recipesData.available ? (
            <>
              <ul>
                {recipesData.available.map((recipe) => (
                  <AllRecipesview key={recipe.recipeID} recipe={recipe} />
                ))}
              </ul>
              <ul>
                {recipesData.deleted.map((recipe) => (
                  <AllRecipesview key={recipe.recipeID} recipe={recipe} />
                ))}
              </ul>
            </>
          ) : (
            <ul>
              {recipesData.map((recipe) => (
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
