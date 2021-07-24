const {TestData} = require('./utils/testData.js');
const testData = new TestData();
const {UserController} = require('./../logic/userController.js');
jest.mock('./../logic/userController.js');
const popularMovies =
  JSON.parse('['+testData.movie1 +','+ testData.movie2 +','+ testData.movie3+']');
UserController.mockImplementation(
    () => ({
      getMovies: jest.fn().mockResolvedValue(popularMovies),
    }),
);

const app = require('./../server.js');
const supertest = require('supertest');
const request = supertest(app);


describe('Get movies tests', () =>{
  test('Get movies from authenticated user without keyword', async () => {
    const response = await request.get('/getMovies').query({
      token: 's6ra092t080te2t12',
    });
    expect(response.body.message).toStrictEqual(popularMovies);
    expect(response.status).toBe(200);
  });
});
