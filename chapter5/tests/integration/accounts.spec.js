const request = require("supertest");
const app = require("../../app");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let account = {};

describe("POST create an account /accounts", () => {
    //dummy account
    let { bank_name, bank_account_number, balance, user_id } = {
        bank_name: "bca",
        bank_account_number: "12345678765",
        balance: 1000,
        user_id: 1,
    };

    //delete dummy data in database before each test
    beforeAll(async () => {
        let isExist = await prisma.bank_Accounts.findFirst({
            where: { bank_account_number },
        });
        if (isExist) {
            await prisma.bank_Accounts.delete({
                where: { id: isExist.id },
            });
        }
    });

    //fail #1 - create an account without a field
    test("fail #1 - create an account without a field", async () => {
        try {
            let { statusCode, body } = await request(app)
                .post("/api/v1/accounts")
                .send({
                    bank_name: "",
                    bank_account_number,
                    balance,
                    user_id,
                });

            expect(statusCode).toBe(404);
        } catch (err) {
            expect(err).toBe("All fields are required");
        }
    });

    //success
    test("success", async () => {
        try {
            let { statusCode, body } = await request(app)
                .post("/api/v1/accounts")
                .send({
                    bank_name,
                    bank_account_number,
                    balance,
                    user_id,
                });

            account = body.data;
            expect(statusCode).toBe(201);
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");
            expect(body.data).toHaveProperty("id", account.id);
            expect(body.data).toHaveProperty("bank_name", account.bank_name);
            expect(body.data).toHaveProperty("bank_account_number", account.bank_account_number);
            expect(body.data).toHaveProperty("balance", account.balance);
            expect(body.data).toHaveProperty("user_id", account.user_id);
        } catch (err) {
            expect(err).toBe("error");
        }
    });
})

describe("GET all accounts /accounts", () => {
    //success
    test("success", async () => {
        try {
            let { statusCode, body } = await request(app).get("/api/v1/accounts");
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");
            expect(body.data).toHaveProperty("length");
            expect(body.data[body.data.length - 1]).toHaveProperty("id", account.id);
            expect(body.data[body.data.length - 1]).toHaveProperty("bank_account_number", account.bank_account_number);
            expect(body.data[body.data.length - 1]).toHaveProperty("user_id", account.user_id);
        } catch (err) {
            expect(err).toBe("error");
        }
    });
})

describe("GET account by id /accounts/:id", () => {
    //success
    test("success", async () => {
        try {
            let { statusCode, body } = await request(app).get(`/api/v1/accounts/${account.id}`);
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");
            expect(body.data).toHaveProperty("id", account.id);
            expect(body.data).toHaveProperty("bank_name", account.bank_name);
            expect(body.data).toHaveProperty("bank_account_number", account.bank_account_number);
            expect(body.data).toHaveProperty("balance", account.balance);
            expect(body.data).toHaveProperty("user");
        } catch (err) {
            expect(err).toBe("error");
        }
    }); 

    //fail #1 - no account
    test("fail #1 - no account", async () => {
        try {
            let { statusCode, body } = await request(app).get(`/api/v1/accounts/${account.id*-1}`);
            expect(statusCode).toBe(404);
        } catch (err) {
            expect(err).toBe("Not found");
        }
    });
})