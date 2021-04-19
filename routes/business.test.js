const app = require("../app");
const request = require("supertest");
const server = request(app);
describe("Businesses TESTS", () => {
  it("Register A Business", async (done) => {
    const data = {

      business_name: "Testing NEW 00322",
      user_name: "Testing api NEW00322",

      password: "biz_ 005",
      address: "biz st",
      type: "biz",
      logo: "img.com",
    };
    await server.post("/business/register").send(data).expect(200);
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

  it("Login as a business", async (done) => {
    const user = {
      user_name: "Testing 007",
      password: "biz_ 005",
    };
    await server.post("/business/login").send(user).expect(200);
    done();
  });

  it("Updates A Businesses info", async (done) => {
    const data = {
      business_name: "Testing with pro api 12308",
      user_name: "Testing 01212311",
      password: "biz_ 005",
      address: "busy street",
      type: "small biz",
      logo: "img.com",
    };
    await server.put("/business/home/3").send(data).expect(200);
    done();
  });

  it("Deletes a Business", async (done) => {
    await server.delete("/business/home/delete-business/10");
    done();
  });
});

describe("Posts TESTS", () => {
  it("Business Creates a Post", async (done) => {
    const data = {
      content: "testing for biz 026663",
    };
    await server.post("/business/create-post/4").send(data);

    done();
  });

  it("Get All Post By a Business", async (done) => {
    await server.get("/business/home/posts/4/all").expect(200);
    done();
  });

  it("Get a Post By ID", async (done) => {
    await server.get("/business/posts/post/1").expect(200);
    done();
  });

  it("Edits a Post", async (done) => {
    const data = {
      content: "updating post 111",
    };
    await server.put("/business/posts/post/1/edit").send(data).expect(200);
    done();
  });

  it("Deletes a Post", async (done) => {
    await server.delete("/business/posts/post/30/remove").expect(200);
    done();
  });
});

describe("Comments TESTS", () => {
  it("Creates a comment", async (done) => {
    const data = {
      content: "more comments",
    };
    await server
      .post("/business/posts/post/1/comment/create/4")
      .send(data)
      .expect(200);
    done();
  });
  it("Get all comments on a post", async (done) => {
    await server.get("/business/posts/post/1/comments/all").expect(200);
    done();
  });
  it("Update comment on a post", async (done) => {
    const data = {
      content: "Update",
    };
    await server.put("/business/posts/post/1/comment/2").send(data).expect(200);
    done();
  });
  it("Delete comment on a post", async (done) => {
    await server.delete("/business/posts/post/1/comment/6").expect(200);
    done();
  });
});
