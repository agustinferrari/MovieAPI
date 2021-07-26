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

app.use((req, res, next) => {
  handleBadJSONError(express.json(), req, res, next);
});
function handleBadJSONError(middleware, req, res, next) {
  middleware(req, res, (err) => {
    if (err) {
      return res.status(400).send('Error: Invalid JSON object received');
    }
    next();
  });
}
app.listen(3000);

app.get('/getMovies', async (req, res) => {
  const token = req.query.token;
  const keyword = req.query.keyword;
  if (validator.isValidToken(token)) {
    try {
      userController.getMovies(token, keyword).then((result) => {
        res.json(result);
      });
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        res.status(401).send(error.message);
      } else if (error instanceof HTTPRequestError) {
        res.status(502).send(error.message);
      } else {
        res.status(500).send('Error: Unexpected Error');
      }
    }
  } else {
    res.status(401).send('Error: the specified token is invalid.');
  }
});

app.post('/registerUser', async (req, res) => {
  const user = req.body;
  if (user !== undefined && validator.isValidUser(user)) {
    if (await userController.register(user)) {
      res.sendStatus(200);
    } else {
      res.status(400).send('Error: there\'s already an'+
      ' existent account using the email entered.');
    }
  } else {
    res.status(400).send('Error: the specified user is invalid,'+
    ' it should be a valid JSON object with the expected properties'+
    ' (email, firstName, lastName, password).'); ;
  }
});

app.post('/login', async (req, res) => {
  const loginEntry = req.body;
  if (validator.isValidLogin(loginEntry)) {
    try {
      const token = userController.login(loginEntry.email, loginEntry.password);
      res.status(200).send(token);
    } catch (error) {
      if (error instanceof InvalidEmailError) {
        res.status(409).send(error.message);
      } else if (error instanceof InvalidPasswordError) {
        res.status(409).send(error.message);
      } else {
        res.status(500).send('Error: Unexpected Error');
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
    res.status(401).send('Error: the specified token is invalid.');
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
          res.status(401).send('Error: the email entered does not match the token received');
        }
      } catch (error) {
        if (error instanceof InvalidTokenError) {
          res.status(401).send(error.message);
        } else {
          res.status(500).send('Error: Unexpected Error');
        }
      }
    } else {
      res.sendStatus(400);
    }
  } else {
    res.status(401).send('Error: the specified token is invalid.');
  }
});

app.get('/getFavorites', async (req, res) => {
  const token = req.query.token;
  const email = req.query.email;
  if (validator.isValidToken(token)) {
    try {
      const result = userController.getFavorites(email, token);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        res.status(401).send(error.message);
      } else {
        res.status(500).send('Error: Unexpected Error');
      }
    }
  } else {
    res.status(401).send('Error: the specified token is invalid.');
  }
});

module.exports = app;
