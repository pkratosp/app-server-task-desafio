import { FastifyInstance } from "fastify"
import { HandleAuthentication } from "./authentication"

const handleAuthentication = new HandleAuthentication()

export async function appRouteAutentication(app: FastifyInstance) {

    app.post("/sign/in", (...args) => handleAuthentication.signIn(...args))
    app.post("/create/account", (...args) => handleAuthentication.signUp(...args))
}