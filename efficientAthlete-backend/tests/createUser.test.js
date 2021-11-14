
const request = require("supertest");
const User = require("../models/user");

const app = require("../server");

const dbHandler = require('./db-handler');

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeEach(async (done) => {
  await dbHandler.connect();
  done();
} );


/**
 * Clear all test data after every test.
 */
afterEach(async (done) => {
  await dbHandler.clearDatabase();
  done();
});

/**
 * Remove and close the db and server.
 */
afterAll(async (done) => {
  await dbHandler.closeDatabase();
  done();
});


describe ("user registration test", () => {
  it("should register the new user successfuly", async () => {
    const res = await request(app).post("/api/user/register").send({
      email: "user1@email.com",
      password:"password",
      institution: "McGill",
      lastName:"user1",
      firstName:"user1"
    });
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("user successuly registered ! Please check your email for a confirmation link");

  });

  it("should fail to register user due to missing information", async () => {
    const res = await request(app).post("/api/user/register").send({
      email: "user1@email.com",
      password:"password",
      institution: "",
      lastName:"user1",
      firstName:"user1"
    });
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.text).errors.institution.name).toEqual("ValidatorError");

  });





});
