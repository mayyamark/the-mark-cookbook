import serviceErrors from './service.errors.js';

const getAllCategories = (categoriesData) => async () => categoriesData.getAll();

const createCategory = (categoriesData) => {
  return async (categoryName) => {
    const exsistingCategory = await categoriesData.getByName(categoryName);

    if (exsistingCategory) {
      return {
        category: null,
        error: serviceErrors.DUPLICATE_RESOURCE,
      };
    }

    const categoryID = await categoriesData.create(categoryName);
    return { category: { categoryID, categoryName }, error: null };
  };
};

export default {
  getAllCategories,
  createCategory,
};