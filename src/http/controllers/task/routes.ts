import { FastifyInstance } from "fastify"
import { HandleTask } from "./task"
import { verifyJwt } from "src/http/middlewares/verify-jwt"

const handleTask = new HandleTask()

export async function appRouteTask (app: FastifyInstance) {

    app.addHook("onRequest", verifyJwt)

    app.post("/task", (...args) => handleTask.createTask(...args))
    app.get("/task", (...args) => handleTask.getTasks(...args))
    app.put("/task/:idTask", (...args) => handleTask.editTask(...args))
    app.delete("/task/:idTask", (...args) => handleTask.removeTask(...args))
    app.patch("/task/completed/:idTask", (...args) => handleTask.completedTask(...args))

}