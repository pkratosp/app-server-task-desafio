import { FastifyReply, FastifyRequest } from "fastify";
import { makeSignInUseCase } from "src/services/factores/user_make/make-sign-in-use-case";
import { makeSignUpUseCase } from "src/services/factores/user_make/make-sign-up-use-case";
import { z } from "zod";

export class HandleAuthentication {

    public async signIn(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { body } = req
            
            const bodyShecma = z.object({
                email: z.string().email(),
                password: z.string()
            })

            const bodyZod = bodyShecma.parse(body)

            const _makeSignInUseCase = await makeSignInUseCase()

            const login  = await _makeSignInUseCase.execute({
                ...bodyZod
            })

            const generateToken = await reply.jwtSign({
                id: login.id,
            }, 
            {
                sign: {
                    expiresIn: "24h"
                }
            })


            return reply.status(200).send({
                token: generateToken,
                data: login,
            })

        } catch (error) {
            
            if(error instanceof Error) {
                return reply.status(500).send(error.message)
            }

            throw error
        }
    }

    public async signUp(req: FastifyRequest, reply: FastifyReply) {
        try {
            
            const { body } = req

            const bodyShecma = z.object({
                email: z.string().email(),
                name: z.string(),
                password: z.string()
            })
            const bodyZod = bodyShecma.parse(body)

            const _makeSignUpUseCase = await makeSignUpUseCase()

            const createUser = await _makeSignUpUseCase.execute({
                ...bodyZod
            })

            return reply.status(201).send(createUser)

        } catch (error) {
            
            if(error instanceof Error) {
                return reply.status(500).send(error.message)
            }

            throw error
        }
    }

}