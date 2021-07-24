const express = require('express');
const {HTTPRequestError} = require('./utils/customExceptions/httpRequestError');
const {InvalidTokenError} = require('./utils/customExceptions/invalidTokenError.js');
const {InvalidEmailError} = require('./utils/customExceptions/invalidEmailError.js');
const {InvalidPasswordError} = require('./utils/customExceptions/invalidPasswordError.js');
const {UserController} = require('./logic/userController.js');
const {Validator} = require('./utils/validator.js');
const validator = new Validator();
const userController = new UserController();

const app = express();
app.use(express.json());
// app.listen(3000);

app.get('/getMovies', async (req, res) => {
  const token = req.query.token;
  const keyword = req.query.keyword;
  if (validator.isValidToken(token)) {
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
        res.status(500).json('Error: Unexpected Error');
      }
    }
  } else {
    res.status(401).json('Error: the specified token is invalid.');
  }
});

app.post('/registerUser', async (req, res) => {
  const user = req.body;
  if (validator.isValidUser(user) && userController.register(user)) {
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.post('/login', async (req, res) => {
  const loginEntry = req.body;
  if (validator.isValidLogin(loginEntry)) {
    try {
      const token = userController.login(loginEntry.email, loginEntry.password);
      res.status(200).json(token);
    } catch (error) {
      if (error instanceof InvalidEmailError) {
        res.status(409).json(error.message);
      } else if (error instanceof InvalidPasswordError) {
        res.status(409).json(error.message);
      } else {
        res.status(500).json('Error: Unexpected Error');
      }
    }
  } else {
    res.sendStatus(400);
  }
});

app.post('/logout', async (req, res) => {
  const token = req.query.token;
  if (validator.isValidToken(token)) {
    userController.logout(token);
    res.sendStatus(200);
  } else {
    res.status(401).json('Error: the specified token is invalid.');
  }
});

app.post('/addFavorites', async (req, res) => {
  const token = req.query.token;
  const addFavoritesEntry = req.body;
  if (validator.isValidToken(token)) {
    if (validator.isValidAddFavorite(addFavoritesEntry)) {
      try {
        if (userController.addFavorites(addFavoritesEntry.email, addFavoritesEntry.movies, token)) {
          res.sendStatus(200);
        } else {
          res.status(401).json('Error: the email entered does not match the token received');
        }
      } catch (error) {
        if (error instanceof InvalidTokenError) {
          res.status(401).json(error.message);
        } else {
          res.status(500).json('Error: Unexpected Error');
        }
      }
    } else {
      res.sendStatus(400);
    }
  } else {
    res.status(401).json('Error: the specified token is invalid.');
  }
});

module.exports = app;
