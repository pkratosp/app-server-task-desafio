import { randomNumber } from "src/functions/randomNumber"
import supertest from "supertest"
import { expect, describe, it, beforeAll, afterAll } from "vitest"
import { app } from "../../../app"

const email = `${randomNumber()}@gmail.com`

describe("test http e2e authenticate", async () => {

    // a cada it(teste), o servidor sera executado e depois fechado
    beforeAll(async () => {
        await app.ready()
    })
    
    afterAll(async () => {
        await app.close()
    })

    it("should create new user", async () => {

        const createUser = await supertest(app.server).post("/create/account").send({
            email: email,
            name: "pedro",
            password: "123456"
        })

        // caso o status for 201 todo o caso de uso foi executado com sucesso
        expect(createUser.statusCode).toEqual(201)
    })

    it("should sign in", async () => {
        const login = await supertest(app.server).post("/sign/in").send({
            email: email,
            password: "123456"
        })

        expect(login.statusCode).toEqual(200)
    })
})