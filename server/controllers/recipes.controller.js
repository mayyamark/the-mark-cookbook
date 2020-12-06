import express from 'express';
import recipesData from '../data/recipes.data.js';
import recipesService from '../services/recipes.service.js';

const recipesController = express.Router();

recipesController.get('/', async (req, res) => {
  const { name, category, order } = req.query;

  const recipes = await recipesService.getAllRecipes(recipesData)(
    name,
    category,
    order,
  );
  res.status(200).send(recipes);
});


export default recipesController;
