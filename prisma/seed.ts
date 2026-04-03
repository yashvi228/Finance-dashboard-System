import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
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

  // Clear existing records to prevent duplicates on multiple seed runs
  await prisma.record.deleteMany({});

  // Seed sample financial records
  await prisma.record.createMany({
    data: [
      { userId: admin.id, amount: 4500, type: 'income', category: 'Salary', date: new Date(new Date().setDate(new Date().getDate() - 10)) },
      { userId: admin.id, amount: 1200, type: 'expense', category: 'Rent', date: new Date(new Date().setDate(new Date().getDate() - 8)) },
      { userId: admin.id, amount: 150, type: 'expense', category: 'Groceries', date: new Date(new Date().setDate(new Date().getDate() - 4)) },
      { userId: admin.id, amount: 300, type: 'expense', category: 'Entertainment', date: new Date() },
      { userId: admin.id, amount: 800, type: 'income', category: 'Freelance', date: new Date(new Date().setMonth(new Date().getMonth() - 1)) },
      { userId: admin.id, amount: 50, type: 'expense', category: 'Transportation', date: new Date(new Date().setDate(new Date().getDate() - 2)) },
    ],
  });

  console.log('Admin user and dummy records successfully seeded!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());