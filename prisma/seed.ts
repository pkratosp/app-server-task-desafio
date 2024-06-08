import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"
const prisma = new PrismaClient()



async function main() {
    const email = "960680153277@gmail.com"
    const hashPassword = await hash("123456", 6) // como nao chamo o caso de uso devo transformar em hash

    // limpa primeiro caso o usuário exista
    const findUser = await prisma.user.findUnique({
        where: {
            email: email
        },
        select: {
            id: true
        }
    })

    if(findUser) {
        const deleteTask = await prisma.tasks.deleteMany({
            where: {
                user_id: findUser?.id
            }
        })
        const deleteUser = await prisma.user.delete({
            where: {
                id: findUser?.id
            }
        })
    }
    
    const createUser = await prisma.user.create({
        data: {
            email: email,
            password: hashPassword,
            name: "jhon doe",
            task: {
                create: {
                    title: "task seed",
                    description: "criar task seed",
                    completed_at: null,
                }
            }
        }
    })

    console.log(createUser)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })