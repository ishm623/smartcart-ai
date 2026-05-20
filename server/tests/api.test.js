const request = require("supertest");
const app = require("../index");

describe("GET /products", () => {
  it("should return products", async () => {
    const response = await request(app).get("/products");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});