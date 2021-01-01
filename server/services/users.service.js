import serviceErrors from './service.errors.js';
import bcrypt from 'bcrypt';

const getLoggedUser = (usersData) => {
  return async (logInData) => {
    const { username, password } =  logInData;

    const user = await usersData.getByUsername(username);

    if (!user) {
      return {
        user: null,
        userError: serviceErrors.RESOURCE_NOT_FOUND,
      };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return {
        user: null,
        userError: serviceErrors.BAD_REQUEST,
      };
    }

    return { user, userError: null };

  };
};

export default {
  getLoggedUser,
};