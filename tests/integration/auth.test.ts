import request from "supertest";
import { app } from "../../src/app";
import { UserModel } from "../../src/modules/user/user.model";

describe("Auth Flow", () => {
  const user = {
    email: "test@test.com",
    name: "Test",
    password: "123456",
  };

  // Her test öncesi veritabanını temizle
  beforeEach(async () => {
    await UserModel.deleteMany({});
  });

  it("should register user", async () => {
    const res = await request(app).post("/api/auth/register").send(user);

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it("should login user", async () => {
    // Önce kullanıcıyı kaydet
    await request(app).post("/api/auth/register").send(user);

    // Sonra giriş yap
    const res = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});