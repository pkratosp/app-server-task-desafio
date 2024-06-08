import { TaskRepository } from "src/repositories/task-repository"

type RequestType = {
    title: string
    description: string
    userId: string
}

export class CreateNewTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute(data: RequestType) {
        
        const createTask = await this.taskRepository.createTask({
            description: data.description,
            title: data.title,
            User: {
                connect: {
                    id: data.userId
                }
            }
        })

        return createTask

    }
}