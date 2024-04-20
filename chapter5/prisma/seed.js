const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    try {
        const user1 = await prisma.users.create({
            data: {
                name: "mirza",
                email: "mirzahm@gmail.com",
                password: "password",
            },
        })
    
        await prisma.profiles.create({
            data: {
                identity_type: "ktp",
                identity_number: "321091239123121",
                address: "bogor",
                user_id: user1.id
            }
        })
        const user2 = await prisma.users.create({
            data: {
                name: "john",
                email: "john@gmail.com",
                password: "pass123",
            },
        })
    
        await prisma.profiles.create({
            data: {
                identity_type: "sim",
                identity_number: "12315323454431",
                address: "bandung",
                user_id: user2.id
            }
        })
    
        const acc1 = await prisma.bank_Accounts.create({
            data: {
                bank_name: "bca",
                bank_account_number: "1234567890",
                balance: 10000,
                user_id: user1.id
            }
        })
    
        const acc2 = await prisma.bank_Accounts.create({
            data: {
                bank_name: "bni",
                bank_account_number: "1234567890",
                balance: 10000,
                user_id: user2.id
            }
        })
    
        const transaction1 = await prisma.transactions.create({
            data: {
                source_account_id: acc1.id,
                destination_account_id: acc2.id,
                amount: 10000
            }
        })
    
        const transaction2 = await prisma.transactions.create({
            data: {
                source_account_id: acc2.id,
                destination_account_id: acc1.id,
                amount: 100000
            }
        })
    
        console.log(user1, user2, acc1, acc2, transaction1, transaction2);
    } catch (err) {
        throw err
    }
}

main().catch((e) => console.log("error while seeding:", e))