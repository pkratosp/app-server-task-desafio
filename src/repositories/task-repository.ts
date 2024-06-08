import { 
    Tasks as TasksType, 
    Prisma
} from "@prisma/client"
import { FilterType } from "src/dto/task-repository-dto"

export interface TaskRepository {

    createTask(data: Prisma.TasksCreateInput): Promise<TasksType>
    editTask(data: Prisma.TasksUpdateInput, idTask: string): Promise<boolean>
    taskCompleted(idTask: string): Promise<boolean>
    removeTask(idTask: string): Promise<boolean>
    listAllTasks(userId: string, filter: FilterType): Promise<{ tasks: TasksType[]; totalTasks: number }>
}