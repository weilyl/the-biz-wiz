const app = require("../app");
const request = require("supertest");
const server = request(app);

describe("Businesses TESTS", () => {
  it("Register A Business", async (done) => {
    const data = {
      business_name: "Testing with pro api",
      user_name: "Testing",
      password: "biz_",
      address: "biz st",
      type: "biz",
      logo: "img.com",
    };
    await server.post("/business/register").send(data).expect(201, done());
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
});
