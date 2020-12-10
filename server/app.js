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
app.use('/images', express.static('images'));

app.use((err, req, res, next) => {
  console.log(err);

  res.status(500).send({
    message:
      'An unexpected error occurred! :( We are working hard to resolve it.',
  });
});

app.all('*', (req, res) =>
  res.status(404).send({ message: 'Resource not found!' }),
);

app.listen(PORT, () =>
  console.log(`Listening for hungry people on port ${PORT}!`),
);
