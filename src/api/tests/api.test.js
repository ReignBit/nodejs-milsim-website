const request = require("supertest");
const app = require("../../../app");
const mongoose = require("mongoose");





describe("GET /users", () => {

    let server;
    let resp;

    beforeEach(() => {
        server = app.listen(6519);
    })

    afterEach(() => {
        server.close();
        mongoose.connection.close();
    })

    it("Respond with 200 status code", async () => {

        await request(server)
        .get("/api/users")
        .expect(200);
    })
});