const prisma = require("../config/prisma.js");

const createTransaction = async (req, res) => {
    try {
        const { source_account_id, destination_account_id, amount } = req.body;

        if(!source_account_id || !destination_account_id || !amount){
            res.status(404).json({message: "All fields are required"})
            return
        }   

        const transaction = await prisma.transactions.create({
            data:{
                source_account_id: source_account_id,
                destination_account_id: destination_account_id,
                amount: amount
            }
        })

        if(!transaction){
            res.status(400).json({message: "Transaction failed to created"})
            return
        }

        res.status(201).json({message: "Success", data: transaction});
    } catch (error) {
        res.status(500).json({message: "Internal server error", data: error.message}); 
    }
}

const getAllTransactions = async (req,res) => {
    try {
        const transactions = await prisma.transactions.findMany()

        if(!transactions){
            res.status(404).json({message: "Not found"})
            return
        }

        res.status(200).json({message: "Success", data: transactions})
    } catch (error) {
        res.status(500).json({message: "Internal server error", data: error.message})
    }
}

const getTransactionById = async (req,res) => {
    try {
        const transaction = await prisma.transactions.findUnique({
            where:{
                id: Number(req.params.id)
            }
        })

        if(!transaction){
            res.status(404).json({message: "Not found"})
            return
        }

        const {source_account_id, destination_account_id, ...restTransaction} = transaction

        const {user_id: source_user_id, ...sourceAcc} = await prisma.bank_Accounts.findUnique({
            where:{
                id: Number(source_account_id)
            }
        })

        const source_user = await prisma.users.findUnique({
            where:{
                id: Number(source_user_id)
            },
            select:{
                id: true,
                name: true,
                email:true
            }
        })

        const {user_id: destination_user_id, ...destinationAcc} = await prisma.bank_Accounts.findUnique({
            where:{
                id: Number(destination_account_id)
            }
        })

        const destination_user = await prisma.users.findUnique({
            where:{
                id: Number(destination_user_id)
            },
            select:{
                id: true,
                name: true,
                email:true
            }
        })

        const result = {...restTransaction, source_account: {...sourceAcc, user:{...source_user}}, destination_account: {...destinationAcc, user:{...destination_user}}}

        res.status(200).json({message: "Success", data: result})
    } catch (error) {
        res.status(500).json({message: "Internal server error", data: error.message})
    }
}

module.exports = { createTransaction, getAllTransactions, getTransactionById }