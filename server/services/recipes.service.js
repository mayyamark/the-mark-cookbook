const getAllRecipes = (recipesData) => {
  return async (name, category, order) => {
    if (name || category || order) {
      return await recipesData.searchBy(name, category, order);
    } else {
      return await recipesData.getAll();
    }
  };
};

export default {
  getAllRecipes
};
