const {UserController} = require('./../Logic/UserController.js');
let userController;

beforeEach(() => {
  userController = new UserController();
});

test('Generate token is alphanumeric and 20 characters long', () =>{
  const token = userController.generateToken();
  const regex = /^[a-z0-9]{20}$/i;
  expect(userDataAccess.login('juanasanchez@gmail.com', 'password12345')).toBeTruthy();
});
