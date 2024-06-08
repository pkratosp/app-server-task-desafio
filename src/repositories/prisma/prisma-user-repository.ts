import { Prisma } from "@prisma/client"
import { UserRepository } from "../user-repository"
import { prisma } from "src/lib/prisma"

export class PrismaUserRepository implements UserRepository {
    
    async signIn(email: string) {
        const findUser = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                email: true,
                name: true,
                password: true
            }
        })

        return findUser
    }

    async signUp(data: Prisma.UserCreateInput) {
        const { id } = await prisma.user.create({
            data: data,
            select: {
                id: true
            }
        })

        if(id) {
            return { id: id }
        }

        return { id: null }
    }

}