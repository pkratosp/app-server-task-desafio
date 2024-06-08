import { z } from "zod"

const envSchema = z.object({
    NODE_ENV: z.enum(["dev","production","test"]).default("dev"),
    PORT: z.coerce.number().default(3333),
    HOST: z.string().default("0.0.0.0"),
    DATABASE_URL: z.string().default("postgresql://username:usernamePassword@localhost:5432/tasks"),
    AUTH_SECRET_TOKEN: z.string().default("njfosdjidsiufijoiodfjsiosdfiojdfsioi90381923isadhijo12312esad@@")
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false) {
    console.log("Variaveis de ambiente invalidas ❌", _env.error.format())
    throw new Error("Variaveis de ambiente invalidas ❌")
}

export const env = _env.data