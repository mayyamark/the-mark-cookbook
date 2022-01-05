import dotenv from 'dotenv';

const config = dotenv.config().parsed || process.env;

const PORT = config.PORT || 5000;

const DB_CONFIG = {
  host: config.DB_HOST || 'localhost',
  port: '3306',
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: 'cookbook',
};

const SECRET_KEY = config.SECRET_KEY || '';

const TOKEN_LIFETIME = 60 * 60;

export {
  PORT,
  DB_CONFIG,
  SECRET_KEY,
  TOKEN_LIFETIME,
};