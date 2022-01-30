// need to comment out app.listen part in index.js for testing to work (otherwise get EADDRINUSE error due to conflicting port access)
const request = require('supertest')
const app = require('./index.js')
const http = require('http');
const User = require('./models/user')

describe("Food routes", () => {

  it("GET /api/foods", () => {
    return request(app)
      .get("/api/foods")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(
          expect.objectContaining({
            "food_list": expect.any(Object),
          })
        )
      })
  })

  it("POST /api/foods/new", () => {
    return request(app)
      .post("/api/foods/new").send({
        category: "Fruit",
        name: "test",
        units: "test",
        location: "test",
        quantity: 5,
        price: 4.5,
        photo: "test",
        rating: 5,
        seller: null,
        // seller: new User({
        //   name: "test",
        //   username: "test",
        //   password: "test"
        // }),
      })
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200)
      .then(res => {
        expect(res.text).toEqual(
          "New food saved"
        )
      })

  })


})
