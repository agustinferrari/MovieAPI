const {UserController} = require('./../Logic/UserController.js');
let userController;

beforeEach(() => {
  userController = new UserController();
});

test('Generate token is alphanumeric and 20 characters long', () =>{
  const token = userController.generateToken();
  const regexAlphanumeric20Chars = /^[a-z0-9]{20}$/i;
  expect(regexAlphanumeric20Chars.test(token)).toBeTruthy();
});

