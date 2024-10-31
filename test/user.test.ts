import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../server";

describe("API Router User", () => {
  it("POST /user/create - should return success and user create info", async () => {
    const response = await request(app).post("/user/create").send({
      name: "Dário",
      email: "jdario1929@gmail.com",
      password: "D@riojose06",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("name", "Dário");
    expect(response.body.data).toHaveProperty("email", "jdario1929@gmail.com");
  });

  it("POST /user/create - should return 400 for invalid data", async () => {
    const response = await request(app).post("/user/create").send({
      name: "Dário",
      email: "jdario069@gmail.com",
      password: "D@riojose06",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("message", [
      "O email já está em uso.",
    ]);
  });
});
