const request = require("supertest");
const app = require("../../app");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let transaction = {};

describe("POST create a transaction /transactions", () => {
    //dummy transaction
    let { source_account_id, destination_account_id, amount } = {
        source_account_id: 1,
        destination_account_id: 3,
        amount: 3000,
    };

    //fail #1 - create an transaction without a field
    test("fail #1 - create an transaction without a field", async () => {
        try {
            let { statusCode, body } = await request(app)
                .post("/api/v1/transactions")
                .send({
                    source_account_id,
                    destination_account_id})
            expect(statusCode).toBe(404);
        } catch (err) {
            expect(err).toBe("All fields are required");
        }
    });

    //success
    test("success", async () => {
        try {
            let { statusCode, body } = await request(app)
                .post("/api/v1/transactions")
                .send({
                    source_account_id,
                    destination_account_id,
                    amount,
                });
            transaction = body.data;
            expect(statusCode).toBe(201);
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");
            expect(body.data).toHaveProperty("id", transaction.id);
            expect(body.data).toHaveProperty("amount", transaction.amount);
        } catch (err) {
            expect(err).toBe("error");
        }
    });
})

describe("GET all transactions /transactions", () => {
    //success
    test("success", async () => {
        try {
            let { statusCode, body } = await request(app).get("/api/v1/transactions");
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");
        } catch (err) {
            expect(err).toBe("error");
        }
    });
})

describe("GET transaction by id /transactions/:id", () => {
    //success
    test("success", async () => {
        try {
            let { statusCode, body } = await request(app).get(`/api/v1/transactions/${transaction.id}`);
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");
            expect(body.data).toHaveProperty("id", transaction.id);
            expect(body.data).toHaveProperty("source_account");
            expect(body.data).toHaveProperty("destination_account");
        } catch (err) {
            expect(err).toBe("error");
        }
    });

    //fail #1 - no transaction
    test("fail #1 - no transaction", async () => {
        try {
            let { statusCode, body } = await request(app).get(`/api/v1/transactions/${transaction.id*-1}`);
            expect(statusCode).toBe(404);
        } catch (err) {
            expect(err).toBe("Not found");
        }
    });
})