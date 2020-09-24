const server = require('../server');
const supertest = require('supertest')
require("dotenv").config();

test('It get a token', async function () {
  const token = await supertest(server)
  .post('/login')
  .send({
    username: 'Dell',
    password: 'abcd1234',
  })
  .then(res => {
    return res.body.token
  })
  expect(token).toBeDefined();
})

describe('Auth testing', () => {
  it('POST /register - should return status 409', function () {
    return supertest(server)
      .post('/register')
      .send({ username: 'Dell', password: 'abcd1234' })
      .then((res) => {
        expect(res.status).toBe(409);
      });
  });

  it('POST /register - res.type should match json', function () {
    return supertest(server)
      .post('/register')
      .send({ username: 'Dell', password: 'abcd1234' })
      .then((res) => {
        expect(res.type).toMatch(/json/i);
      });
  });

  it('POST /login - res.type should match json', function () {
    return supertest(server)
      .post('/login')
      .send({ username: 'Dell', password: 'abcd1234' })
      .then((res) => {
        expect(res.type).toMatch(/json/i);
      });
  });

  it('POST /login - should return status 401', function () {
    return supertest(server)
      .post('/login')
      .send({ username: 'Dell', password: '1234' })
      .then((res) => {
        expect(res.status).toBe(401);
      });
  });

  it('Should respond with a 401', () => {
    return supertest(server)
      .get('/recipes')
      .then((res) => {
        expect(res.status).toBe(401);
        expect(res.type).toBe('application/json');
      });
  });

  it('Should respond with a 200', async () => {
    let cookie;
    before(function (done) {
      req.post('/login')
    })

    .send({
      username: 'Dell',
      password: 'abcd1234',
    })
    .then(res => {
      cookie.saveCookies(res);
    })
    expect(cookie).toBeTruthy();
    req = request.get('/recipes');
    cookie.attachCookies(req)
        .then((res) => {
        expect(res.status).toBe(200);
        expect(res.type).toBe('application/json');
      });
  });
});
