import { PrismaTaskRepository } from "src/repositories/prisma/prisma-task-repository"
import { RemoveTaskUseCase } from "src/services/task_use_case/remove-task-use-case"

export async function makeRemoveTaskUseCase() {
    const prismaTaskRepository = new PrismaTaskRepository()
    const removeTaskUseCase = new RemoveTaskUseCase(prismaTaskRepository)

    return removeTaskUseCase
}