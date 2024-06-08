import { InMemoryTaskRepository } from "src/repositories/in-memory/in-memory-task-repository"
import { expect, describe, it, beforeAll } from "vitest"
import { CreateNewTaskUseCase } from "./create-new-task-use-case"
import { EditTaskUseCase } from "./edit-task-use-case"

let inMemoryTaskRepository: InMemoryTaskRepository
let sutCreateTask: CreateNewTaskUseCase
let sut: EditTaskUseCase

describe("edit task", async () => {

    // chama apenas uma vez
    beforeAll(() => {
        inMemoryTaskRepository = new InMemoryTaskRepository()
        sutCreateTask = new CreateNewTaskUseCase(inMemoryTaskRepository)
        sut = new EditTaskUseCase(inMemoryTaskRepository)
    })

    it("user should edit task", async () => {

        const { id } = await sutCreateTask.execute({
            title: "nova task",
            description: "descrição da nova task",
            userId: "d729a893-8914-4ac6-aa18-5fe8d6d743d5"
        })

       const edit = await sut.execute({
        id: id,
        title: "editando"
       })

       expect(edit).toEqual(true)
    })

})