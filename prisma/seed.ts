import { PrismaClient } from '@prisma/client'
import { fa, faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
    await prisma.todo.createMany({
      data: Array.from({ length: 20 }, () => ({
        title: faker.lorem.text(),
        body : faker.lorem.paragraph(),
        
      })),
    })
  // await prisma.user.createMany({
  //   data:Array.from({ length: 20 }, () => ({
  //     name: faker.internet.userName(),
  //     email:faker.internet.email(),
  //     address:{
      
  //         street: faker.location.street(),
  //         city: faker.location.city(),
  //         state: faker.location.state(),
  //         zip: faker.location.zipCode(),
        
  //     }
  //   })),
  // })

}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })