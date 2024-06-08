import Fastify from "fastify"
import cors from "@fastify/cors"
import fastidyJWT from "@fastify/jwt"

// rotas
import { appRouteTask } from "./http/controllers/task/routes"
import { appRouteAutentication } from "./http/controllers/authentication/routes"


import { env } from "./env/env" // variaveis de ambiente
import { ZodError } from "zod"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

// TODO
// falantando seed - []
// faltando rotas - [x]

export const app = Fastify({
    logger: env.NODE_ENV === "dev" ? true : false
})

app.register(cors, {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    origin: "*",
    logLevel: "debug",
})

app.register(fastidyJWT, {
    secret: env.AUTH_SECRET_TOKEN
})

app.register(appRouteTask)
app.register(appRouteAutentication)


app.setErrorHandler((error, _, reply) => {

    if (env.NODE_ENV !== "production") {
        console.error(error)
    }

    if (error instanceof ZodError) {
        return reply.status(400).send({
            error: error.format(),
        })
    } else if(error instanceof PrismaClientKnownRequestError){

        if(error.code === "P2025") {
            return reply.status(404).send({
                error: "Usuário não encontrado"
            })
        }

        return reply.status(400).send({
            error: error.message
        })

    } else {
        return reply.status(500).send({
            error: "Erro do Servidor Interno"
        })
    }

})