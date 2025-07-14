const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: "Usuário Teste",
      email: "teste@exemplo.com",
      password: "$2a$10$123456789012345678901uQwKjQwKjQwKjQwKjQwKjQwKjQwKjQwKjQwKj", // hash fictício
    }
  });

  await prisma.lead.create({
    data: {
      name: "Lead Teste",
      email: "lead@exemplo.com",
      phone: "11999999999",
      userId: 1
    }
  });
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());