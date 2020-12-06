import express from 'express';
import measuresData from '../data/measures.data.js';
import measuresService from '../services/measures.service.js';
import serviceErrors from '../services/service.errors.js';
import bodyValidator from '../middlewares/body-validator.js';
import createMeasureSchema from '../validators/create-measure.schema.js';

const measuresController = express.Router();

measuresController.get('/', async (req, res) => {

  const measures = await measuresService.getAllMeasures(measuresData)();
  res.status(200).send(measures);
});


export default measuresController;