import { PrismaTaskRepository } from "src/repositories/prisma/prisma-task-repository"
import { EditTaskUseCase } from "src/services/task_use_case/edit-task-use-case"

export async function makeEditTaskUseCase() {
    const prismaTaskRepository = new PrismaTaskRepository()
    const editTaskUseCase = new EditTaskUseCase(prismaTaskRepository)

    return editTaskUseCase
}