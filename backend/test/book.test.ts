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

describe("Test BookController", () => {
    test("Get all books", async () => {
        const res = await request(app).get("/api/books");
        expect(res.body).toEqual([]);
    });
});
