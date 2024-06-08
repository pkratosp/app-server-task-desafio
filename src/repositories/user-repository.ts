import { 
    Prisma,
} from "@prisma/client"

export interface UserRepository {

    signIn(email: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
    } | null>
    signUp(data: Prisma.UserCreateInput): Promise<{ id: string | null }>

}