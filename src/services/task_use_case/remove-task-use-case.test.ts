import { InMemoryTaskRepository } from "src/repositories/in-memory/in-memory-task-repository"
import { expect, describe, it, beforeAll } from "vitest"
import { CreateNewTaskUseCase } from "./create-new-task-use-case"
import { RemoveTaskUseCase } from "./remove-task-use-case"

let inMemoryTaskRepository: InMemoryTaskRepository
let sutCreate: CreateNewTaskUseCase
let sut: RemoveTaskUseCase

describe("remove task", async () => {

    // chama apenas uma vez
    beforeAll(() => {
        inMemoryTaskRepository = new InMemoryTaskRepository()
        sutCreate = new CreateNewTaskUseCase(inMemoryTaskRepository)
        sut = new RemoveTaskUseCase(inMemoryTaskRepository)
    })

    it("user should remove task", async () => {

        // criei duas task neste teste para evitar outra validação no in-memory
        const [createTask, createTask1] = await Promise.all([
            sutCreate.execute({
                title: "nova task",
                description: "descrição da nova task",
                userId: "d729a893-8914-4ac6-aa18-5fe8d6d743d5"
            }),
            sutCreate.execute({
                title: "nova task",
                description: "descrição da nova task",
                userId: "d729a893-8914-4ac6-aa18-5fe8d6d743d5"
            })
        ])

        const remove = await sut.execute({ id: createTask.id })

        
        expect(remove).toEqual(true)
    })

})