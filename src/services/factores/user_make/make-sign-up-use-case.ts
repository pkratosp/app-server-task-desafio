import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository"
import { SignUpUseCase } from "src/services/user_use_case/sign-up-use-case"

export async function makeSignUpUseCase() {
    const prismaUserRepository = new PrismaUserRepository()
    const signUpUseCase = new SignUpUseCase(prismaUserRepository)

    return signUpUseCase
}