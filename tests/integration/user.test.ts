import request from "supertest";
import { app } from "../../src/app";

describe("Protected User Routes", () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "me@test.com",
      name: "Me",
      password: "123456",
    });

    token = res.body.token;
  });

  it("should return current user", async () => {
    const res = await request(app)
      .get("/api/user/getMe")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.user).toBeDefined();
  });

  it("should block unauthorized access", async () => {
    const res = await request(app).get("/api/user/getMe");
    expect(res.status).toBe(401);
  });

  it("should return 401 for invalid token", async () => {
    const res = await request(app)
      .get("/api/user/getMe")
      .set("Authorization", "Bearer invalid.token.here");

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid token");
  });

  it("should return 401 for expired token", async () => {
    // Geçersiz bir token formatı (expired token simülasyonu için)
    const expiredToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjAwMDAwMDAwLCJleHAiOjE2MDAwMDAwMDB9.invalid";
    const res = await request(app)
      .get("/api/user/getMe")
      .set("Authorization", `Bearer ${expiredToken}`);

    expect(res.status).toBe(401);
  });
});
