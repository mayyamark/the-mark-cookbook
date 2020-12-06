import express from 'express';
import categoriesData from '../data/categories.data.js';
import categoriesService from '../services/categories.service.js';
import serviceErrors from '../services/service.errors.js';
import bodyValidator from '../middlewares/body-validator.js';
import createCategorySchema from '../validators/create-category.schema.js';

const categoriesController = express.Router();

categoriesController.get('/', async (req, res) => {

  const categories = await categoriesService.getAllCategories(categoriesData)();
  res.status(200).send(categories);
});

categoriesController.post('/', bodyValidator(createCategorySchema), async (req, res) => {
  const { categoryName } = req.body;

  const { category, error } = await categoriesService.createCategory(categoriesData)(categoryName);

  if (error === serviceErrors.DUPLICATE_RESOURCE) {
    return res.status(409).send({ message: `Category '${categoryName}' exsists already!`});
  }
  res.status(200).send(category);
});

export default categoriesController;