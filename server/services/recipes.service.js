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


export default {
  getAllRecipes,
  getRecipeById,
};
