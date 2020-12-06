import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { PORT } from './config.js';
import addVersionHeader from './middlewares/version-header-adder.js';
import recipesController from './controllers/recipes.controller.js';
import categoriesController from './controllers/categories.controller.js';
import measuresController from './controllers/measures.controller.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.use(addVersionHeader);

app.use('/recipes', recipesController);
app.use('/categories', categoriesController);
app.use('/measures', measuresController);

app.listen(PORT, () =>
  console.log(`Listening for hungry people on port ${PORT}!`),
);
