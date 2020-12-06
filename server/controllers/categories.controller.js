import express from 'express';
import categoriesData from '../data/categories.data.js';
import categoriesService from '../services/categories.service.js';

const categoriesController = express.Router();

categoriesController.get('/', async (req, res) => {

  const categories = await categoriesService.getAllCategories(categoriesData)();
  res.status(200).send(categories);
});


export default categoriesController;