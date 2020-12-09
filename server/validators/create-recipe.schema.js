const createRecipeSchema = {
  recipeName: (value) => {
    if (!value) {
      return 'Recipe\'s name is required!';
    }
    if (typeof value !== 'string' || value.trim().length < 3) {
      return 'Recipe\'s name must be a string with more than 3 characters!';
    }
    return null;
  },
  category: (value) => {
    if (!value) {
      return 'Recipe\'s category is required!';
    }
    if (typeof value !== 'string' || value.trim().length < 3) {
      return 'Recipe\'s category must be a string with more than 3 characters!';
    }
    return null;
  },
  instructions: (value) => {
    if (!value) {
      return 'Recipe\'s instructions are requiered!';
    }
    if (typeof value !== 'string' || value.trim().length < 15) {
      return 'Recipe\'s instructions with [15, 500] characters!';
    }
    return null;
  },
  ingredients: (value) => {
    if (!value) {
      return 'Recipe\'s ingredients are required!';
    }
    if (!Array.isArray(value) || value.length < 1) {
      return 'Recipe\'s ingredients must be sent in an array with at least 1 element!';
    }

    if (value.some((el) => !el.ingredient || !el.measure || !el.amount)) {
      return 'Each element in the ingredients array must have ingredient, measure and amount property! Valid format: [{ ingredient:..., measure:..., amount:... }, ...]';
    }
    if (
      !value.every(
        (el) =>
          typeof el.measure === 'string' &&
          el.measure.trim().length > 1 &&
          el.ingredient.length < 45,
      )
    ) {
      return 'The measure property of each element of the ingredients array must be a string with [1, 45] characters!';
    }
    if (
      !value.every(
        (el) =>
          typeof el.ingredient === 'string' &&
          el.ingredient.trim().length > 1 &&
          el.ingredient.length < 45,
      )
    ) {
      return 'The ingredient property of each element of the ingredients array must be a string with [1, 45] characters!';
    }
    if (value.some((el) => typeof el.amount === 'number' && el.amount > 0)) {
      return 'The amount property of each element of the ingredients array must be a number, greater than 0!';
    }
    return null;
  },
};

export default createRecipeSchema;
