import { PrismaTaskRepository } from "src/repositories/prisma/prisma-task-repository"
import { AllTaskByUserUseCase } from "src/services/task_use_case/all-task-by-user-use-case"

export async function makeAllTaskByUserUseCase() {
    const prismaTaskRepository = new PrismaTaskRepository()
    const allTaskByUserUseCase = new AllTaskByUserUseCase(prismaTaskRepository)

    return allTaskByUserUseCase
}