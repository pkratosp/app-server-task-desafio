import { hash } from "bcryptjs"
import { UserRepository } from "src/repositories/user-repository"
import { UserNotCreatedError } from "../errors/user/user-not-created-error"

type RequestType = {
    name: string
    email: string
    password: string
}

export class SignUpUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(data: RequestType) {

        const hashPassword = await hash(data.password, 6)
        
        const createNewUser = await this.userRepository.signUp({
            email: data.email,
            name: data.name,
            password: hashPassword,
        })

        
        if(createNewUser.id === null) {
            throw new UserNotCreatedError()
        }
        
        return createNewUser
    }
}