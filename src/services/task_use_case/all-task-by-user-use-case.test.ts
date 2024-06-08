import { InMemoryTaskRepository } from "src/repositories/in-memory/in-memory-task-repository"
import { expect, expectTypeOf, describe, it, beforeEach } from "vitest"
import { AllTaskByUserUseCase } from "./all-task-by-user-use-case"
import { CreateNewTaskUseCase } from "./create-new-task-use-case"
import { EmptyError } from "../errors/task/empty-data-error"

let inMemoryTaskRepository: InMemoryTaskRepository
let sutCreated: CreateNewTaskUseCase
let sut: AllTaskByUserUseCase

describe("list all task", async () => {

    beforeEach(() => {
        inMemoryTaskRepository = new InMemoryTaskRepository()
        sutCreated = new CreateNewTaskUseCase(inMemoryTaskRepository)
        sut = new AllTaskByUserUseCase(inMemoryTaskRepository)
    })

    it("user should view all task", async () => {
        const userId = "d729a893-8914-4ac6-aa18-5fe8d6d743d5"

        const { id } = await sutCreated.execute({
            title: "nova task",
            description: "descrição da nova task",
            userId: userId
        })

        const list = await sut.execute({ userId: userId, filter: { page: 1 } })

        expectTypeOf(list.tasks).toBeArray()
        
    })

    it("user should data empty", async () => {
        const userId = "d729a893-8914-4ac6-aa18-5fe8d6d743d5"

        const { id } = await sutCreated.execute({
            title: "nova task",
            description: "descrição da nova task",
            userId: "userId"
        })

        expect(async () => 
            await sut.execute({ userId: userId, filter: { page: 1 } }) 
        ).rejects.toBeInstanceOf(EmptyError)

    })
})