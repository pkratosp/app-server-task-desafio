import { describe, it, expect, beforeEach } from "vitest"
import { InMemoryUserRepository } from "src/repositories/in-memory/in-memory-user-repository"
import { SignUpUseCase } from "./sign-up-use-case"
import { UserNotCreatedError } from "../errors/user/user-not-created-error"

let inMemoryUserRepository: InMemoryUserRepository
let sut: SignUpUseCase

describe("sign up", async () => {

    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        sut = new SignUpUseCase(inMemoryUserRepository)
    })

    it("user should sign up", async () => {

        const createUser = await sut.execute({
            name: "username",
            email: "p20142004@gmail.com",
            password: "12345678"
        })

        expect(createUser.id).toEqual(expect.any(String))
    })

    it("user not should duplicate", async () => {

        const createUser = await sut.execute({
            name: "username",
            email: "p20142004@gmail.com",
            password: "12345678"
        })


        await expect(async () => 
        
            await sut.execute({
                name: "username",
                email: "p20142004@gmail.com",
                password: "12345678"
            })
        ).rejects.toBeInstanceOf(UserNotCreatedError)      
       
    })
})