import express from 'express';
import createToken from '../auth/create-token.js';
import bodyValidator from '../middlewares/body-validator.js';
import userLogInSchema from '../validators/user-login.schema.js';
import usersService from '../services/users.service.js';
import serviceErrors from '../services/service.errors.js';
import usersData from '../data/users.data.js';

const authController = express.Router();

authController.post(
  '/',
  bodyValidator(userLogInSchema),
  async (req, res) => {
    const logInData = req.body;

    const { user, userError } = await usersService.getLoggedUser(usersData)(
      logInData,
    );

    if (userError === serviceErrors.RESOURCE_NOT_FOUND) {
      return res.status(404).send({ message: 'User is not found!' });
    }
    if (userError === serviceErrors.BAD_REQUEST) {
      return res.status(401).send({ message: 'Invalid credentials!' });
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = createToken(payload);

    res.status(200).send({ token });
  },
);

export default authController;
