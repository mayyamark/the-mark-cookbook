import serviceErrors from './service.errors.js';

const getAllMeasures = (measuresData) => async () => measuresData.getAll();

const createMeasure = (measuresData) => {
  return async (measureName) => {
    const exsistingcategory = await measuresData.getByName(measureName);

    if (exsistingcategory) {
      return {
        category: null,
        error: serviceErrors.DUPLICATE_RESOURCE,
      };
    }

    const measureID = await measuresData.create(measureName);
    const measure = { measureID, measureName };
    return { measure, error: null };
  };
};

export default {
  getAllMeasures,
  createMeasure,
};