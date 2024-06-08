import { app } from "./app"
import { env } from "./env/env"

app.listen({
    port: env.PORT,
    host: env.HOST
}).then(() => {
    console.log("Servidor rodando na porta 3333...")
    console.log("http://localhost:3333/")
})