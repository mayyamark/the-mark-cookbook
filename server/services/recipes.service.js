import serviceErrors from './service.errors.js';

const getAllRecipes = (recipesData) => {
  return async (name, category, order) => {
    if (name || category || order) {
      return await recipesData.searchBy(name, category, order);
    } else {
      return await recipesData.getAll();
    }
  };
};

const getRecipeById = (recipesData) => {
  return async (recipeID) => {
    const recipe = await recipesData.getById(recipeID);

    if (!recipe) {
      return {
        error: serviceErrors.RESOURCE_NOT_FOUND,
        recipe: null,
      };
    }

    return {
      error: null,
      recipe: recipe,
    };
  };
};

const createRecipe = (recipesData) => {
  return async (recipeName, category, instructions, ingredients) => {
    const exsistingRecipe = await recipesData.getByName(recipeName);
    if (exsistingRecipe) {
      return {
        error: serviceErrors.DUPLICATE_RESOURCE,
        recipe: null,
      };
    }

    const newRecipe = await recipesData.create(recipeName, category, instructions, ingredients);
    if (!newRecipe) {
      return {
        error: serviceErrors.INSERT_FAILED,
        recipe: null,
      };
    }

    return {
      recipe: newRecipe,
      error: null,
    };
  };
};

const updateRecipe = (recipesData) => {
  return async (recipeID, recipeName, category, instructions, ingredients, isDeleted) => {
    const exsistingRecipe = await recipesData.getById(recipeID);
    if (!exsistingRecipe) {
      return {
        error: serviceErrors.RESOURCE_NOT_FOUND,
        recipe: null,
      };
    }

    const updatedRecipe = await recipesData.update(recipeID, recipeName, category, instructions, ingredients, isDeleted);
    if (!updatedRecipe) {
      return {
        error: serviceErrors.UPDATE_FAILED,
        recipe: null,
      };
    }

    return {
      recipe: updatedRecipe,
      error: null,
    };
  };
};
export default {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
};
