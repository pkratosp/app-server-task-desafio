import { InMemoryTaskRepository } from "src/repositories/in-memory/in-memory-task-repository"
import { expect, describe, it, beforeAll } from "vitest"
import { CreateNewTaskUseCase } from "./create-new-task-use-case"
import { TaskCompletedUseCase } from "./task-completed-use-case"

let inMemoryTaskRepository: InMemoryTaskRepository
let sutCreated: CreateNewTaskUseCase
let sut: TaskCompletedUseCase

describe("completed task", async () => {

    // chama apenas uma vez
    beforeAll(() => {
        inMemoryTaskRepository = new InMemoryTaskRepository()
        sutCreated = new CreateNewTaskUseCase(inMemoryTaskRepository)
        sut = new TaskCompletedUseCase(inMemoryTaskRepository)
    })

    it("user should completed task", async () => {

        const { id } = await sutCreated.execute({
            title: "nova task",
            description: "descrição da nova task",
            userId: "d729a893-8914-4ac6-aa18-5fe8d6d743d5"
        })

        const completed = await sut.execute({ id: id })

        expect(completed).toEqual(true)
    })

})