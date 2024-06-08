import { PrismaTaskRepository } from "src/repositories/prisma/prisma-task-repository"
import { CreateNewTaskUseCase } from "src/services/task_use_case/create-new-task-use-case"

export async function makeCreateNewTaskUseCase() {
    const prismaTaskRepository = new PrismaTaskRepository()
    const createNewTaskUseCase = new CreateNewTaskUseCase(prismaTaskRepository)
    
    return createNewTaskUseCase
}