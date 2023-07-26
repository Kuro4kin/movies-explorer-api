const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const routes = require('./routes')

// подключить роуты
// подключить обраблтчик ошибок

const app = express();
const { PORT = 3000 } = process.env;

mongoose
  .connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('MongoDB is connected');
  });

app.use(express.json());
app.use(cookieParser());
app.use('/', routes);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
