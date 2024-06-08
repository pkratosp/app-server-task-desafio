import { PrismaTaskRepository } from "src/repositories/prisma/prisma-task-repository"
import { TaskCompletedUseCase } from "src/services/task_use_case/task-completed-use-case"

export async function makeTaskCompletedUseCase() {
    const prismaTaskRepository = new PrismaTaskRepository()
    const taskCompletedUseCase = new TaskCompletedUseCase(prismaTaskRepository)

    return taskCompletedUseCase
}