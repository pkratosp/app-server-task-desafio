import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository"
import { SignInUseCase } from "src/services/user_use_case/sign-in-use-case"

export async function makeSignInUseCase() {
    const prismaUserRepository = new PrismaUserRepository()
    const signInUseCase = new SignInUseCase(prismaUserRepository)

    return signInUseCase
}