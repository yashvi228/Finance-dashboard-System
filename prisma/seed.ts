import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      status: 'active',
    },
  });
  console.log('Admin user seeded with correct hash');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());