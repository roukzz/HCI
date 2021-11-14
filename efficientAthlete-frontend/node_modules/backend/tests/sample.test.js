
const request = require("supertest");
const app = require("../server");

const dbHandler = require('./db-handler');


// show that jest works properly
describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
});




describe("HELLO WORLD TEST", () => {
  it("returns HELLO WORLD", async () =>{
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("HELLO WORLD");
  } );

});
