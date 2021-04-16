const app = require("../app");
const request = require("supertest");
const server = request(app);

describe("Businesses TESTS", () => {
  it("Register A Business", async (done) => {
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
    await server.get("/business/home/1").expect(200);
    done();
  });

  it("Get Business by name", async (done) => {
    await server.get("/business/find/search=Testing").expect(200);
    done();
  });

  it.only("Login as a business", async (done) => {
    const user = {
      user_name: "Testing 007",
      password: "biz_ 005",
    };
    await server
      .post("/business/login")
      .send(user)
      .expect(200) 
    done();
  })

  it("Updates A Businesses info", async (done) => {
    const data = {
      business_name: "Testing with pro api 12308",
      user_name: "Testing 0128",
      password: "biz_ 005",
      address: "busy street",
      type: "small biz",
      logo: "img.com",
    };
    await server.put("/business/home/3").send(data).expect(200);
    done();
  });

  it("Deletes a Business", async (done) => {
    await server.delete("/business/home/delete-business/13");
    done();
  });

});
