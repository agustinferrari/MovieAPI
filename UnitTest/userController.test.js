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

test('Add registered user session', () =>{
  const email = 'juanasanchez@gmail.com';
  expect(userController.saveSession(email)).toBeTruthy();
  const sessionArray = userController.sessionArray;
  let userAddedToSessionArray = false;
  for (let i = 0; i < sessionArray.length && !userAddedToSessionArray; i++) {
    const sessionIterator = sessionArray[i];
    if (sessionIterator.userId === email) {
      userAddedToSessionArray = true;
    }
  }
  expect(userAddedToSessionArray).toBeTruthy();
});
