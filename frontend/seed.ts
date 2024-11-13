import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const defaultUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      id: '77838aac-7588-47e7-8273-c7bf30d51fef',
      username: 'admin',
      password: 'Admin123!',
    },
  });

  console.log({ defaultUser });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
