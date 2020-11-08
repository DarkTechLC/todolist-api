require('dotenv-save').config();
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user');

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', userRoutes);

module.exports = app;
