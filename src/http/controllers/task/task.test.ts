import { randomNumber } from "src/functions/randomNumber"
import supertest from "supertest"
import { expect, describe, it, beforeAll, afterAll } from "vitest"
import { app } from "../../../app"

let token: string

async function createTask(token: string) {
    const createTask = await supertest(app.server).post("/task").send({
        title: "nova task",
        description: "descrição da task"
    }).set("Authorization", `Bearer ${token}`)

    return createTask
}

describe("test http e2e task", async () => {

    beforeAll(async () => {
        await app.ready()

        const login = await supertest(app.server).post("/sign/in").send({
            email: "960680153277@gmail.com",
            password: "123456"
        })

        if(login.statusCode === 200) {
            token = login.body.token;
        }
    })
    
    afterAll(async () => {
        await app.close()
    })

    it("user should create new task", async () => {
        const create = await createTask(token)

        expect(create.statusCode).toEqual(201)
    })

    it("user should edit task", async () => {
        const create = await createTask(token)

        const edit = await supertest(app.server).put(`/task/${create.text}`).send({
            title: "Editando task"
        }).set("Authorization", `Bearer ${token}`)

        expect(edit.statusCode).toEqual(200)
    })

    it("user should remove task", async () => {
        const create = await createTask(token)

        const removeTask = await supertest(app.server).delete(`/task/${create.text}`)
            .set("Authorization", `Bearer ${token}`)

        expect(removeTask.statusCode).toEqual(200)
    })

    it("user should completed task", async () => {
        const create = await createTask(token)

        const completedTask = await supertest(app.server).patch(`/task/completed/${create.text}`)
            .set("Authorization", `Bearer ${token}`)

        expect(completedTask.statusCode).toEqual(200)  
    })

    it("user should view all tasks", async () => {
        const create = await createTask(token)
        
        const listAllTasks = await supertest(app.server).get(`/task?page=1`)
            .set("Authorization", `Bearer ${token}`)

        expect(listAllTasks.statusCode).toEqual(200)  
    })
})