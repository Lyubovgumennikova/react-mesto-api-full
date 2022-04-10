const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');
const validations = require('./middlewares/validations');
const NotFound = require('./errors/NotFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(cors({
  origin: 'http://localhost:3001/',
  credentials: true,
}));

app.use(requestLogger); // подключаем логгер запросов

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.get('/crash', (req, res, next) => {
  next(new Error('Приложение упало ('));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', validations.register, createUser);
app.post('/signin', validations.register, login);

app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use((req, res, next) => {
  next(new NotFound('Маршрут не найден'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
