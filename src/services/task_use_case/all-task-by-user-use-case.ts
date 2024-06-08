import { TaskRepository } from "src/repositories/task-repository"
import { EmptyError } from "../errors/task/empty-data-error"
import { RequiredParams } from "../errors/task/required-params-error"

type RequestType = {
    userId: string
    filter: {
        page?: number
        title?: string
        description?: string
    }
}

export class AllTaskByUserUseCase {
    constructor(private taskRepository: TaskRepository) {}
    
    async execute({ filter, userId }: RequestType) {

        // devemos atribuir uma valor para page, pois se nao vai listar todos(pois o valor de page tbm é opicional)
        if(filter.page == undefined && filter.description == undefined && filter.title == undefined) 
            throw new RequiredParams()

        const findAllTaskByUser = await this.taskRepository.listAllTasks(userId, {
            ...filter
        })

        if(findAllTaskByUser.tasks.length === 0) 
            throw new EmptyError()


        return findAllTaskByUser;
    }
}