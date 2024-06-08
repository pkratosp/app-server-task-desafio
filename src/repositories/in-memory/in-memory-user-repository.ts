import { Prisma, User } from "@prisma/client"
import { UserRepository } from "../user-repository"
import { randomUUID } from "node:crypto"

export class InMemoryUserRepository implements UserRepository {
    
    public users: User[] = []

    async signIn(email: string) {
        const [findUser] = this.users.filter((user) => user.email === email)

        if(findUser) {
            return {
                id: findUser.id,
                name: findUser.name,
                email: findUser.email,
                password: findUser.password,
            }
        }

        return null
    }

    
    async signUp(data: Prisma.UserCreateInput){
        // verifico se os usuarios em memorrias sao unicos, caso nao seja sera emitido um erro
        const [findUser] = this.users.filter((user) => user.email === data.email)
        
        if(findUser) 
            return { id: null }


        const id = randomUUID()

        this.users.push({
            ...data,
            id: id,
            created_at: new Date(),
            updated_at: new Date(),
        })

        return { id: id }
    }


}