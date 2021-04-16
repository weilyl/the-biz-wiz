const app = require("../app");
const request = require("supertest");
const server = request(app);

describe("Businesses TESTS", () => {
  it.only("Register A Business", async (done) => {
    const data = {
      "business_name": "Testing with pro api 005",
      "user_name": "Testing 005",
      "password": "biz_ 005",
      "address": "biz st",
      "type": "biz",
      "logo": "img.com",
    };
    await server
      .post("/business/register")
      .send(data)
      .expect(200)
      done();
  });

  it("Get all Businesses", async (done) => {
    await server.get("/business/all").expect(200);
    done();
  });

  it("Get Business by Id", async (done) => {
    await server.get("/business/home/2").expect(200);
    done();
  });

  it("Get Business by name", async (done) => {
    await server.get("/business/find/search=Testing").expect(200);
    done();
  });

  it("Login as a business", async (done) => {
    const user = {
      user_name: "Test",
      password: "bizzzz"
    };
    await server.post("/business/login").send(user).expect(200, done());
  })
});
