import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'gabrielmartiliano2@gmail.com' },
    update: {},
    create: {
      email: 'gabrielmartiliano2@gmail.com',
      password: '$2a$12$WdvXZe/gWW.tXeZEEMznQuyb2U3Oj26gxT1qmnehxg7U5sLlxtOza', 
     
    },
  });
  console.log({ user });
}
main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });