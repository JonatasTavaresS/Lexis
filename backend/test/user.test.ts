import { afterAll, beforeEach, expect } from '@jest/globals';
import request from "supertest";
import sequelize from "../src/config/database";
import app from "../src/index";

const waitForSequelize = async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        setTimeout(waitForSequelize, 10000);
    }
};

beforeEach(async () => {
    await waitForSequelize();
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe("Test UserController", () => {
    test("Get all users", async () => {
        const res = await request(app).get("/api/users");
        expect(res.body).toEqual([]);
    });

    test("Create User", async () => {
        const res = await request(app)
            .post("/api/users")
            .send({
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@lexis.com.br",
                password: "123456",
                role: "USER"
            });
        expect(res.body.firstName).toBe("John");
        expect(res.body.lastName).toBe("Doe");
        expect(res.body.email).toBe("john.doe@lexis.com.br");
        expect(res.body.role).toBe("USER");
        expect(res.status).toBe(201);
    });

    test("Get User", async () => {
        const user = await request(app)
            .post("/api/users")
            .send({
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@lexis.com.br",
                password: "123456",
                role: "USER"
            });

        const res = await request(app).get(`/api/users/${user.body.id}`);
        expect(res.body.firstName).toBe("John");
        expect(res.body.lastName).toBe("Doe");
        expect(res.body.email).toBe("john.doe@lexis.com.br");
        expect(res.body.role).toBe("USER");
        expect(res.status).toBe(200);
    });

    test("Update User", async () => {
        const user = await request(app)
            .post("/api/users")
            .send({
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@lexis.com.br",
                password: "123456",
                role: "USER"
            });

        const res = await request(app)
            .put(`/api/users/${user.body.id}`)
            .send({
                firstName: "Jane",
                lastName: "Doe",
                email: "jane.doe@lexis.com.br",
                password: "123456",
                role: "USER"
            });
        expect(res.body.firstName).toBe("Jane");
        expect(res.body.lastName).toBe("Doe");
        expect(res.body.email).toBe("jane.doe@lexis.com.br");
        expect(res.body.role).toBe("USER");
        expect(res.status).toBe(200);
    });
});
