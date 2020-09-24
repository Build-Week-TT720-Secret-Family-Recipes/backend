const request = require("supertest")
const server = require("../server")
const db = require("../data/dbConfig");
const { set } = require("../server");
require("dotenv").config();

afterAll(async () => {
	await db.destroy()
})

test("GET /measurements", async () => {
   await request(server)
    .post('/login')
    .send({
      username: 'Dell',
      password: 'abcd1234',
    })
    .then(res => {
      const cookie = res.body.token;
      return cookie;
    })
  const res = await request(server)
  .get("/measurements")
  .set('authorization', `${cookie}`);
  expect(res.statusCode).toBe(200);
  expect(res.type).toBe("application/json")
})