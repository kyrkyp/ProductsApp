const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../index");

const helper = require("../helpers/user.helper");
require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Check User's route requests", () => {
  test("Get all users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBeTruthy();
    expect(response.body.data.length).toBeGreaterThan(0);
  }, 10000);

  test("Get one user", async () => {
    const lastInsertedUser = await helper.findLastInsertedUser();

    const response = await request(app).get(
      "/api/users/" + lastInsertedUser.username
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBeTruthy();
    expect(response.body.data.username).toBe(lastInsertedUser.username);
    expect(response.body.data.email).toBe(lastInsertedUser.email);
  }, 10000);

  test("Create a user", async () => {
    const response = await request(app).post("/api/users").send({
      username: "testuser",
      password: "testuser",
      name: "testuser",
      surname: "testuser",
      email: "test@aueb.gr",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBeTruthy();
  }, 10000);

  test("Create a that already exists", async () => {
    const lastInsertedUser = await helper.findLastInsertedUser();

    const response = await request(app).post("/api/users").send({
      username: lastInsertedUser.username,
      password: lastInsertedUser.password,
      name: lastInsertedUser.name,
      surname: lastInsertedUser.surname,
      email: lastInsertedUser.email,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBeFalsy();
  });

  test("Update a user", async () => {
    const lastInsertedUser = await helper.findLastInsertedUser();

    const response = await request(app)
      .put("/api/users/" + lastInsertedUser.username)
      .send({
        username: lastInsertedUser.username,
        name: "testuser",
        surname: "testuser",
        email: "test@email.com",
        address: {
          area: "xxx",
          road: "xxx",
        },
        phone: [
          {
            type: "mobile",
            number: "111111",
          },
        ],
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBeTruthy();
  }, 10000);

  test("Delete a user", async () => {
    const lastInsertedUser = await helper.findLastInsertedUser();

    const response = await request(app).delete(
      "/api/users/" + lastInsertedUser.username
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBeTruthy();
  }, 10000);
});
