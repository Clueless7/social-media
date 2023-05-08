import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const john = await prisma.user.upsert({
    where: { email: 'johndoe@example.com' },
    update: {},
    create: {
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: bcrypt.hashSync(process.env.SEED_PASSWORD),
      username: 'johndoe1',
      city: 'America',
      website: 'johndoe.com',
    },
  })

  console.log('Created account', john)
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
