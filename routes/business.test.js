const app = require("../app");
const request = require("supertest");
const server = request(app);

describe("Businesses TESTS", () => {
  it("Register A Business", (done) => {
    const data = {
      business_name: "Testing with erwizzle",
      user_name: "Test",
      password: "bizzzz",
      type: "biz",
      logo: "img.com",
    };
    server.post("business/register").send(data).expect(201, done());
  });

  it("Get all Businesses", (done) => {
    return server.get("business/all").expect(200, done());
  });
});
