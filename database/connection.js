import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(){
    try {
        await prisma.$connect()
        console.log('Connected to prisma')
    } catch (error) {
        await prisma.$disconnect()
        console.log('Disconnect from prisma. Error details: ' + error);
    }
}

main();