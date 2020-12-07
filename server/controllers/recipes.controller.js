import express from 'express';
import imagesController from './images.controller.js';
import recipesData from '../data/recipes.data.js';
import serviceErrors from '../services/service.errors.js';
import recipesService from '../services/recipes.service.js';
import bodyValidator from '../middlewares/body-validator.js';
import createRecipeSchema from '../validators/create-recipe.schema.js';
import updateRecipeSchema from '../validators/update-recipe.schema.js';

const recipesController = express.Router();
recipesController.use(imagesController);

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

  const { error, recipe } = await recipesService.getRecipeById(recipesData)(
    recipeID,
  );

  if (error === serviceErrors.RESOURCE_NOT_FOUND) {
    return res
      .status(404)
      .send({ message: `There is no recipe with id ${recipeID}!` });
  }

  res.status(200).send(recipe);
});

recipesController.post(
  '/',
  bodyValidator(createRecipeSchema),
  async (req, res) => {
    const { recipeName, category, instructions, ingredients } = req.body;

    const { error, recipe } = await recipesService.createRecipe(recipesData)(
      recipeName,
      category,
      instructions,
      ingredients,
    );

    if (error === serviceErrors.DUPLICATE_RESOURCE) {
      return res.status(400).send({
        message: `A recipe with name '${recipeName}' exsists already!`,
      });
    } else if (error === serviceErrors.INSERT_FAILED) {
      return res.status(400).send({ message: 'Insertion failed!' });
    }

    res.status(201).send(recipe);
  },
);

recipesController.put(
  '/:recipeID',
  bodyValidator(updateRecipeSchema),
  async (req, res) => {
    const { recipeID } = req.params;
    const {
      recipeName,
      category,
      instructions,
      ingredients,
      isDeleted,
    } = req.body;

    const { error, recipe } = await recipesService.updateRecipe(recipesData)(
      recipeID,
      recipeName,
      category,
      instructions,
      ingredients,
      isDeleted,
    );

    if (error === serviceErrors.RESOURCE_NOT_FOUND) {
      return res
        .status(404)
        .send({ message: `There is no recipe with id ${recipeID}!` });
    }
    if (error === serviceErrors.UPDATE_FAILED) {
      return res.status(400).send({ message: 'Update failed!' });
    }

    res.status(200).send(recipe);
  },
);
export default recipesController;
