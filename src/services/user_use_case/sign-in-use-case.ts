import { UserRepository } from "src/repositories/user-repository"
import { compare } from "bcryptjs"
import { InvalidCredentialsError } from "../errors/user/invalid-credentials-error"

type RequestType = {
    email: string
    password: string
}

export class SignInUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(data: RequestType) {

        const find = await this.userRepository.signIn(data.email)

        
        if(!find) 
            throw new InvalidCredentialsError()
        
        // o primeiro parametro deve ser a senha sem criptografia
        const doestPasswordMatches = await compare(data.password, find.password)
        
        if(!doestPasswordMatches) 
            throw new InvalidCredentialsError()

        return find
    }
}