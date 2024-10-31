import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../server";

describe("API Router User - Create", () => {
  it("POST /user/create - should return success and user create info", async () => {
    const response = await request(app).post("/user/create").send({
      name: "Dário",
      email: "jdario1949@gmail.com",
      password: "D@riojose06",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("name", "Dário");
    expect(response.body.data).toHaveProperty("email", "jdario1949@gmail.com");
  });

  it("POST /user/create - should return 409 for invalid data", async () => {
    const response = await request(app).post("/user/create").send({
      name: "Dário",
      email: "jdario069@gmail.com",
      password: "D@riojose06",
    });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("error");
  });
});

describe("API Router User - login", () => {
  it("POST /user/login - should return success and login autorized", async () => {
    const response = await request(app).post("/user/login").send({
      email: "jdario1949@gmail.com",
      password: "D@riojose06",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("message", "Autorized");
  });

  it("POST /user/login - password invalid", async () => {
    const response = await request(app).post("/user/login").send({
      email: "teste4@gmail.com",
      password: "dadadada",
    });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("error", ["Senha incorreta!"]);
  });

  it("POST /user/login - e-mail invalid", async () => {
    const response = await request(app).post("/user/login").send({
      email: "baba@gmail.com",
      password: "12345",
    });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("error", ["Usuário não existe!"]);
  });
});
