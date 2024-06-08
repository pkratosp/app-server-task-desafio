import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { FastifyReply, FastifyRequest } from "fastify"
import { EmptyError } from "src/services/errors/task/empty-data-error"
import { RequiredParams } from "src/services/errors/task/required-params-error"
import { makeAllTaskByUserUseCase } from "src/services/factores/task_make/make-all-task-by-user-use-case"
import { makeCreateNewTaskUseCase } from "src/services/factores/task_make/make-create-new-task-use-case"
import { makeEditTaskUseCase } from "src/services/factores/task_make/make-edit-task-use-case"
import { makeImportFIleCSVUseCase } from "src/services/factores/task_make/make-import-file-csv-use-case"
import { makeRemoveTaskUseCase } from "src/services/factores/task_make/make-remove-task-use-case"
import { makeTaskCompletedUseCase } from "src/services/factores/task_make/make-task-completed-use-case"
import { ZodError, z } from "zod"

export class HandleTask {

    public async createTask(req: FastifyRequest, reply: FastifyReply) {
        try {
            
            const { body } = req
            const userJWT = await req.jwtDecode()

            const userJWTShecma = z.object({
                id: z.string().uuid(),
            })

            const userJWTZod = userJWTShecma.parse(userJWT)
            

            const bodyShecma = z.object({
                title: z.string(),
                description: z.string()
            })
            const bodyZod = bodyShecma.parse(body)

            const _makeCreateNewTaskUseCase = await makeCreateNewTaskUseCase()

            const create = await _makeCreateNewTaskUseCase.execute({
                title: bodyZod.title,
                description: bodyZod.description,
                userId: userJWTZod.id
            })

            return reply.status(201).send(create.id)

        } catch (error) {
            
            if(error instanceof ZodError) {
                throw error
            }

            if(error instanceof PrismaClientKnownRequestError) {
                throw error
            }

            if(error instanceof Error) {
                return reply.status(500).send(error.message)
            }

            throw error
        }
    }

    public async editTask(req: FastifyRequest, reply: FastifyReply) {
        try {

            const { body, params } = req
            
            const paramsShecma = z.object({
                idTask: z.string().uuid()
            })

            const bodyShecma = z.object({
                title: z.string().optional(),
                description: z.string().optional()
            })

            const { description, title } = bodyShecma.parse(body)
            const { idTask } = paramsShecma.parse(params)

            const _makeEditTaskUseCase = await makeEditTaskUseCase()

            const edit = await _makeEditTaskUseCase.execute({
                id: idTask,
                description: description,
                title: title
            })

            return reply.status(200).send(edit)

        } catch (error) {
            if(error instanceof Error) {
                return reply.status(500).send(error.message)
            }

            throw error
        }
    }

    public async removeTask(req: FastifyRequest, reply: FastifyReply) {
        try {
            
            const { params } = req
            
            const paramsShecma = z.object({
                idTask: z.string().uuid()
            })
            const { idTask } = paramsShecma.parse(params)

            const _makeRemoveTaskUseCase = await makeRemoveTaskUseCase()

            const removeTask = await _makeRemoveTaskUseCase.execute({ id: idTask })

            return reply.status(200).send(removeTask)

        } catch (error) {
            if(error instanceof Error) {
                return reply.status(500).send(error.message)
            }

            throw error
        }
    }

    public async completedTask(req: FastifyRequest, reply: FastifyReply) {
        try {

            const { params } = req
            
            const paramsShecma = z.object({
                idTask: z.string().uuid()
            })
            const { idTask } = paramsShecma.parse(params)

            const _makeTaskCompletedUseCase = await makeTaskCompletedUseCase()

            const completedTask = await _makeTaskCompletedUseCase.execute({ id: idTask })

            return reply.status(200).send(completedTask)
            
        } catch (error) {
            if(error instanceof Error) {
                return reply.status(500).send(error.message)
            }

            throw error
        }
    }

    public async getTasks(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { query } = req

            const queryShecma = z.object({
                page: z.coerce.number().optional(),
                title: z.string().optional(),
                description: z.string().optional()
            })
            const queryZod = queryShecma.parse(query)

            const userJWT = await req.jwtDecode()

            const userJWTShecma = z.object({
                id: z.string().uuid(),
            })

            const userJWTZod = userJWTShecma.parse(userJWT)


            const _makeAllTaskByUserUseCase = await makeAllTaskByUserUseCase()
            
            const list = await _makeAllTaskByUserUseCase.execute({ 
                userId: userJWTZod.id, 
                filter: { 
                    ...queryZod
                }
            })
            

            return reply.status(200).send(list)

        } catch (error) {

            if(error instanceof RequiredParams) {
                return reply.status(400).send(error.message)
            }

            if(error instanceof EmptyError) {
                return reply.status(200).send(error.message)
            }

            throw error
        }
    }


    public async importCSV(req: FastifyRequest, reply: FastifyReply) {
        try {
            const data = await req.file()
            
            const userJWT = await req.jwtDecode()

            const userJWTShecma = z.object({
                id: z.string().uuid(),
            })

            const userJWTZod = userJWTShecma.parse(userJWT)


            if(data?.mimetype === 'text/csv') {
                
                const _makeImportFIleCSVUseCase = await makeImportFIleCSVUseCase()

                await _makeImportFIleCSVUseCase.execute({ file: data.file, filename: data.filename, userId: userJWTZod.id })
                
                reply.status(200).send()

            } else {

                throw new Error('Arquivo não permitido')

            }

            
        } catch (error) {
            
            if(error instanceof Error) {
                return reply.status(500).send(error.message)
            }

            throw error

        }
    }
}