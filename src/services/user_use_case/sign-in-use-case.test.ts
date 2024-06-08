import { describe, it, expect, beforeEach } from "vitest"
import { InMemoryUserRepository } from "src/repositories/in-memory/in-memory-user-repository"
import { SignInUseCase } from "./sign-in-use-case"
import { SignUpUseCase } from "./sign-up-use-case"
import { InvalidCredentialsError } from "../errors/user/invalid-credentials-error"

let inMemoryUserRepository: InMemoryUserRepository
let sutCreateUser: SignUpUseCase
let sut: SignInUseCase

describe("sign in", async () => {

    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        sutCreateUser = new SignUpUseCase(inMemoryUserRepository)
        sut = new SignInUseCase(inMemoryUserRepository)
    })

    it("user should sign in", async () => {

        const createUser = await sutCreateUser.execute({
            name: "username",
            email: "p20142004@gmail.com",
            password: "12345678"
        })

        const login = await sut.execute({
            email: "p20142004@gmail.com",
            password: "12345678"
        })

        expect(login.id).toEqual(expect.any(String))
    })

    it("user not should sign in when password incorrect", async () => {
        const createUser = await sutCreateUser.execute({
            name: "username",
            email: "p20142004@gmail.com",
            password: "12345678"
        })

        await expect(async () => 
            await sut.execute({
                email: "p20142004@gmail.com",
                password: "testesenha"
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

})