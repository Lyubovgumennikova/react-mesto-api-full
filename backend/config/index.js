require('dotenv').config();

const SALT_ROUNDS = 10;
const JWT_SECRET = 'JWT_SECRET';
const {
  SECRET_KEY,
  NODE_ENV,
} = process.env;

module.exports = {
  SALT_ROUNDS,
  // JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET',
  JWT_SECRET: NODE_ENV === 'production' ? SECRET_KEY : JWT_SECRET,
};
