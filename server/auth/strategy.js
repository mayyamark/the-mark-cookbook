import passportJwt from 'passport-jwt';
import { SECRET_KEY } from './../config.js';

const options = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new passportJwt.Strategy(options, async (payload, done) => {
  const user = {
    id: payload.sub,
    username: payload.username,
  };

  done(null, user);
});

export default jwtStrategy;
