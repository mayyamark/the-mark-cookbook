import express from 'express';
import recipesData from '../data/recipes.data.js';
import serviceErrors from '../services/service.errors.js';
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

recipesController.get('/:recipeID', async (req, res) => {
  const { recipeID } = req.params;

  const { error, recipe } = await recipesService.getRecipeById(recipesData)(recipeID);

  if (error === serviceErrors.RESOURCE_NOT_FOUND) {
    return res
      .status(404)
      .send({ message: `There is no recipe with id ${recipeID}!` });
  }

  res.status(200).send(recipe);
});





export default recipesController;
