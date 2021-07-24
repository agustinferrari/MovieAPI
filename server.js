const express = require('express');
const {HTTPRequestError} = require('./utils/customExceptions/httpRequestError');
const {InvalidTokenError} = require('./utils/customExceptions/invalidTokenError.js');
const {InvalidEmailError} = require('./utils/customExceptions/invalidEmailError.js');
const {InvalidPasswordError} = require('./utils/customExceptions/invalidPasswordError.js');
const {UserController} = require('./logic/userController.js');
const userController = new UserController();
const app = express();
app.listen(3000);

app.get('/getMovies/', async (req, res) => {
  const token = req.query.token;
  const keyword = req.query.keyword;
  try {
    userController.getMovies(token, keyword).then((result) => {
      res.json({message: result});
    });
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      res.status(401).json(error.message);
    } else if (error instanceof HTTPRequestError) {
      res.status(502).json(error.message);
    } else {
      res.status(500).json();
    }
  }
});

module.exports = app;
