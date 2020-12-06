const createCategorySchema = {
  categoryName: (value) => {
    if (!value) {
      return 'Category\'s name is required!';
    }
    if (typeof value !== 'string' || value.trim().length < 3) {
      return 'Category\'s name must be a string with more than 3 characters!';
    }
    return null;
  },
};

export default createCategorySchema;
