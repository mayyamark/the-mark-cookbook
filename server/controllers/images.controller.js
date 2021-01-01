import express from 'express';
import multer from 'multer';
import storage from './../storage.js';
import authMiddleware from '../middlewares/auth-middleware.js';
import imagesService from '../services/images.services.js';
import serviceErrors from '../services/service.errors.js';
import recipesData from '../data/recipes.data.js';
import imagesData from '../data/images.data.js';

const imagesController = express.Router();
imagesController.use(authMiddleware);

imagesController.post(
  '/:recipeID/images',
  multer({ storage: storage }).array('images'),
  async (req, res) => {
    const { recipeID } = req.params;
    const filesData = req.files;

    const { images, error } = await imagesService.addImages(recipesData, imagesData)(recipeID, filesData);
    if (error === serviceErrors.RESOURCE_NOT_FOUND) {
      return res.status(404).send({ message: `There is no recipe with id ${recipeID}!`});
    }
    if (error === serviceErrors.INSERT_FAILED) {
      return res.status(400).send({ message: 'Insertion failed!'});
    }
    res.status(201).send(images);
  },
);

imagesController.delete(
  '/:recipeID/images',
  async (req, res) => {
    const { recipeID } = req.params;
    const imagesIDs = req.body;

    const { images, error } = await imagesService.removeImages(recipesData, imagesData)(recipeID, imagesIDs);
    if (error === serviceErrors.RESOURCE_NOT_FOUND) {
      return res.status(404).send({ message: `There is no recipe with id ${recipeID}!`});
    }
    if (error === serviceErrors.INSERT_FAILED) {
      return res.status(400).send({ message: 'Remove operation failed!'});
    }
    res.status(201).send(images);
  },
);

export default imagesController;
