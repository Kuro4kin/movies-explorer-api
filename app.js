require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const routes = require('./routes');

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
app.use(cors({ origin: ['https://movies.kurochkin.nomoredomains.work', 'http://movies.kurochkin.nomoredomains.work'], credentials: true }));
app.use(cookieParser());
app.use('/', routes);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
