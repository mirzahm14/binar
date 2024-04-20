const request = require("supertest");
const app = require("../../app");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let user = {};

describe("POST create an user /users", () => {
  //dummy user
  let { name, email, password, identity_type, identity_number, address } = {
    name: "mirza",
    email: "qKsGw@example.com",
    password: "password",
    identity_type: "ktp",
    identity_number: "1234567890123456",
    address: "bogor",
  };

  //delete dummy data in database
  beforeAll(async () => {
    let isExist = await prisma.users.findUnique({ where: { email } });
    if (isExist) {
      await prisma.profiles.delete({ where: { user_id: isExist.id } });
      await prisma.users.delete({ where: { email } });
    }
  });

  //fail #1 - create an user without a field
  test("fail #1 - create an user without a field", async () => {
    try {
      let { statusCode, body } = await request(app)
        .post("/api/v1/users")
        .send({
          name: "",
          email,
          password,
          identity_type,
          identity_number,
          address,
        });

      expect(statusCode).toBe(404);
    } catch (err) {
      expect(err).toBe("All fields are required");
    }
  });

  //fail #2 - email existed
  test("fail #2 - email existed", async () => {
    try {
      let { statusCode, body } = await request(app)
        .post("/api/v1/users")
        .send({
          name,
          email: "mirzahm@gmail.com",
          password,
          identity_type,
          identity_number,
          address,
        });

      expect(statusCode).toBe(400);
    } catch (err) {
      expect(err).toBe("Email already exist");
    }
  });

  //success
  test("success", async () => {
    try {
      let { statusCode, body } = await request(app)
        .post("/api/v1/users")
        .send({
          name,
          email,
          password,
          identity_type,
          identity_number,
          address,
        });

      user = body.data;

      expect(statusCode).toBe(201);
      expect(body).toHaveProperty("message");
      expect(body).toHaveProperty("data");
      expect(body.data).toHaveProperty("id", user.id);
      expect(body.data).toHaveProperty("name", user.name);
      expect(body.data).toHaveProperty("email", user.email);
    } catch (err) {
      expect(err).toBe("error");
    }
  });
});

describe("GET all users /users", () => {
  //success
  test("success", async () => {
    try {
      let { statusCode, body } = await request(app).get("/api/v1/users");
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty("message");
      expect(body).toHaveProperty("data");
    } catch (err) {
      expect(err).toBe("error");
    }
  });
});

describe("GET user by id /users/:id", () => {
  //fail #1 - no user
  test("fail #1 - no user", async () => {
    try {
      let { statusCode, body } = await request(app).get(
        `/api/v1/users/${user.id*-1}`
      );
      expect(statusCode).toBe(404); // Expect a 404 Not Found status
    } catch (err) {
      expect(err.message).toContain("User not found"); // Expect specific error message
    }
  });
  //success
  test("success", async () => {
    try {
      let { statusCode, body } = await request(app).get(
        `/api/v1/users/${user.id}`
      );
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty("message");
      expect(body).toHaveProperty("data");
      expect(body.data).toHaveProperty("id", user.id);
      expect(body.data).toHaveProperty("name", user.name);
      expect(body.data).toHaveProperty("email", user.email);
    } catch (err) {
      expect(err).toBe("error");
    }
  });
});
