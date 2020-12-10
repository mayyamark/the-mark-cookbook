const updateRecipeSchema = {
  recipeName: (value) => {
    if (!value) {
      return null;
    }
    if (typeof value !== 'string' || value.trim().length < 3) {
      return 'Recipe\'s name must be a string with more than 3 characters!';
    }
    return null;
  },
  category: (value) => {
    if (!value) {
      return null;
    }
    if (typeof value !== 'string' || value.trim().length < 3) {
      return 'Recipe\'s category must be a string with more than 3 characters!';
    }
    return null;
  },
  instructions: (value) => {
    if (!value) {
      return null;
    }
    if (typeof value !== 'string' || value.trim().length < 15 || value.length > 500) {
      return 'Recipe\'s instructions with [15, 500] characters!';
    }
    return null;
  },
  ingredients: (value) => {
    if (!value) {
      return null;
    }
    if (!Array.isArray(value) || value.length < 1) {
      return 'Recipe\'s ingredients must be sent in an array with at least 1 element!';
    }

    if (!value.every((el) => el.ingredient && el.measure && el.amount)) {
      return 'Each element in the ingredients array must have ingredient, measure and amount property! Valid format: [{ ingredient:..., measure:..., amount:... }, ...]';
    }
    if (
      !value.every(
        (el) => typeof el.measure === 'string' && el.measure.trim().length > 1,
      )
    ) {
      return 'The measure property of each element of the ingredients array must be a string with [1, 45] characters!';
    }
    if (
      !value.every(
        (el) =>
          typeof el.recipeIngredientID === 'number' &&
          el.recipeIngredientID >= 0,
      )
    ) {
      return 'The recipeIngredientID property of each element of the ingredients array must be a number, greater than 0!';
    }
    if (
      !value.every(
        (el) => typeof el.ingredient === 'string' && el.ingredient.length < 45,
      )
    ) {
      return 'The ingredient property of each element of the ingredients array must be a string with [3, 45] characters!';
    }
    if (!value.every((el) => typeof el.amount === 'number' && el.amount > 0)) {
      return 'The amount property of each element of the ingredients array must be a number, greater than 0!';
    }
    return null;
  },
  isDeleted: (value) => {
    if (!value || value === 1) {
      return null;
    }
    return 'The field isDeleted must be 0 or 1!';
  },
};

export default updateRecipeSchema;
