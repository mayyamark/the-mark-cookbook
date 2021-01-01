import express from 'express';
import authMiddleware from '../middlewares/auth-middleware.js';
import measuresData from '../data/measures.data.js';
import measuresService from '../services/measures.service.js';
import serviceErrors from '../services/service.errors.js';
import bodyValidator from '../middlewares/body-validator.js';
import createMeasureSchema from '../validators/create-measure.schema.js';

const measuresController = express.Router();
measuresController.use(authMiddleware);

measuresController.get('/', async (req, res) => {

  const measures = await measuresService.getAllMeasures(measuresData)();
  res.status(200).send(measures);
});

measuresController.post('/', bodyValidator(createMeasureSchema), async (req, res) => {
  const { measureName } = req.body;

  const { measure, error } = await measuresService.createMeasure(measuresData)(measureName);

  if (error === serviceErrors.DUPLICATE_RESOURCE) {
    return res.status(409).send({ message: `Measure '${measureName}' exsists already!`});
  }
  res.status(200).send(measure);
});

export default measuresController;