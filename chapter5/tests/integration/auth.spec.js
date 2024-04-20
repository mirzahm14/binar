const request = require("supertest");
const app = require("../../app");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let user = {};

describe("POST /auth/register", () => {
    //dummy user
    const { name, email, password } = {
        name: "admin",
        email: "admin@mail.com",
        password: "admin123",
    };

    //delete dummy data in database before each test
    beforeAll(async () => {
        let isExist = await prisma.users.findUnique({ where: { email } });
        if (isExist) {
            await prisma.users.delete({ where: { email } });
        }
    });

    //fail #1 - create an user without a field
    test("fail #1 - create an user without a field", async () => {
        try {
            let { statusCode, body } = await request(app)
                .post("/api/v1/auth/register")
                .send({
                    name: "",
                    email,
                    password,
                });

            expect(statusCode).toBe(400);
        } catch (err) {
            expect(err).toBe("All fields are required");
        }
    });

    //fail #2 - email existed
    test("fail #2 - email existed", async () => {
        try {
            let { statusCode, body } = await request(app)
                .post("/api/v1/auth/register")
                .send({
                    name,
                    email: "mirzahm@gmail.com",
                    password,
                });

            expect(statusCode).toBe(401);
        } catch (err) {
            expect(err).toBe("Email already exist");
        }
    });
    
    //success
    test("success", async () => {
        try {
            let { statusCode, body } = await request(app)
                .post("/api/v1/auth/register")
                .send({
                    name,
                    email,
                    password,
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
    })
})

let token = ''
describe("POST /auth/login", () => {
    //fail #1 - wrong email
    test("fail #1 - wrong email", async () => {
        try {
            let { statusCode, body } = await request(app)
                .post("/api/v1/auth/login")
                .send({
                    email: "mirzahm14@gmailcom",
                    password: "admin123",
                });
            expect(statusCode).toBe(400);
        } catch (err) {
            expect(err).toBe("Invalid email or password");
        }
    });

    //fail #2 - wrong password
    test("fail #2 - wrong password", async () => {
        try {
            let { statusCode, body } = await request(app)
                .post("/api/v1/auth/login")
                .send({
                    email: "admin@mailcom",
                    password: "admin1234",
                });
            expect(statusCode).toBe(400);
        } catch (err) {
            expect(err).toBe("Invalid email or password");
        }
    });

    //success
    test("success", async () => {
            let { statusCode, body } = await request(app)
                .post("/api/v1/auth/login")
                .send({
                    email: user.email,
                    password: "admin123",
                });
            token = body.data.token
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");
            expect(body.data).toHaveProperty("id", user.id);
            expect(body.data).toHaveProperty("name", user.name);
            expect(body.data).toHaveProperty("email", user.email);
            expect(body.data).toHaveProperty("token", token);
    })
})


describe("GET /auth/authenticate", () => {
    //fail #1 - no token
    test("fail #1 - no token", async () => {
        try {
            let { statusCode, body } = await request(app)
                .get("/api/v1/auth/authenticate");
            expect(statusCode).toBe(401);
        } catch (err) {
            expect(err).toBe("Unauthorized");
        }
    });

    //success
    test("success", async () => {
        try {
            let { statusCode, body } = await request(app)
                .get("/api/v1/auth/authenticate")
                .set("Authorization", `Bearer ${token}`);
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");
            expect(body.data).toHaveProperty("id", user.id);
        } catch (err) {
            expect(err).toBe("error");
        }
    })
})