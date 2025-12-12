const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const count = await prisma.pushSubscription.count();
        console.log('Total subscriptions:', count);
        const subs = await prisma.pushSubscription.findMany();
        console.log('Subscriptions:', JSON.stringify(subs, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
