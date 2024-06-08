import { TaskRepository } from "src/repositories/task-repository"

type RequestType = {
    id: string
    title?: string
    description?: string
}

export class EditTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute(data: RequestType) {
        const editTask = await this.taskRepository.editTask({ ...data }, data.id)

        return editTask
    }
}