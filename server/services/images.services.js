import serviceErrors from './service.errors.js';

const addImages = (recipesData, imagesData) => {
  return async (recipeID, filesData) => {
    const exsistingRecipe = await recipesData.getById(recipeID);
    if (!exsistingRecipe) {
      return {
        images: null,
        error: serviceErrors.RESOURCE_NOT_FOUND,
      };
    }

    const images = await imagesData.add(recipeID, filesData);
    if (!images) {
      return {
        images: null,
        error: serviceErrors.INSERT_FAILED,
      };
    }

    return { images, error: null };
  };
};

const removeImage = (recipesData, imagesData) => {
  return async (recipeID, imageID) => {
    const exsistingRecipe = await recipesData.getById(recipeID);
    if (!exsistingRecipe) {
      return {
        image: null,
        error: serviceErrors.RESOURCE_NOT_FOUND,
      };
    }

    const image = await imagesData.remove(imageID);
    if (!image) {
      return {
        image: null,
        error: serviceErrors.UPDATE_FAILED,
      };
    }

    return { image, error: null };
  };
};

export default {
  addImages,
  removeImage,
};