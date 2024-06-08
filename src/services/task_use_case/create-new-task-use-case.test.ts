import { InMemoryTaskRepository } from "src/repositories/in-memory/in-memory-task-repository"
import { expect, describe, it, beforeAll } from "vitest"
import { CreateNewTaskUseCase } from "./create-new-task-use-case"

let inMemoryTaskRepository: InMemoryTaskRepository
let sut: CreateNewTaskUseCase

describe("Create new task", async () => {

    // chama apenas uma vez
    beforeAll(() => {
        inMemoryTaskRepository = new InMemoryTaskRepository()
        sut = new CreateNewTaskUseCase(inMemoryTaskRepository)
    })

    it("user should create new task", async () => {

        const { id } = await sut.execute({
            title: "nova task",
            description: "descrição da nova task",
            userId: "d729a893-8914-4ac6-aa18-5fe8d6d743d5"
        })

        expect(id).toEqual(expect.any(String))
    })

})