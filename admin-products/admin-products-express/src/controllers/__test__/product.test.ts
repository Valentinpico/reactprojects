import request from "supertest";
import server from "../../server";

describe("Post-api", () => {
  it("Post a la api", async () => {
    const response = await request(server).post("/api/products").send({
      name: "product",
      price: 100,
    });
    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(200);
  });
});
