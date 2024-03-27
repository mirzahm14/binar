const prisma = require("../config/prisma.js");

const createAccount = async (req, res) => {
    try {
        const {bank_name, bank_account_number, balance, user_id} = req.body

        if(!bank_name || !bank_account_number || !balance || !user_id){
            res.status(404).json({message: "All fields are required"})
            return
        }

        const account = await prisma.bank_Accounts.create({
            data:{
                bank_name: bank_name,
                bank_account_number: bank_account_number,
                balance: balance,
                user_id: user_id
            }
        })

        if(!account){
           res.status(400).json({message: "Account failed to created"}) 
        }

        res.status(201).json({message: "Success", data: account})
    } catch (error) {
        res.status(500).json({message: "Internal server error", data: error.message})
    }
}

const getAllAccounts = async (req,res) => {
    try {
        const accounts = await prisma.bank_Accounts.findMany({
            select:{
                id: true,
                user_id: true,
                bank_account_number: true
            }
        })

        if(!accounts){
            res.status(404).json({message: "Not found"})
            return
        }

        res.status(200).json({message: "Success", data: accounts});
    } catch (error) {
        res.status(500).json({message: "Internal server error", data: error.message})
    }
}

const getAccountById = async (req,res) => {
    try {
        const account = await prisma.bank_Accounts.findUnique({
            where:{
                id: Number(req.params.id)
            },
        })

        if(!account){
            res.status(404).json({message: "Not found"})
            return
        }

        const {user_id, ...restAccount} = account

        const user = await prisma.users.findUnique({
            where:{
                id: user_id
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        })

        const result = {...restAccount, user}
        res.status(200).json({message: "Success", data: result});
    } catch (error) {
        res.status(500).json({message: "Internal server error", data: error.message})
    }
}

module.exports = { createAccount, getAllAccounts, getAccountById }