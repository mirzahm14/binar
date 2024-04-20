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
        }else{
            await prisma.bank_Accounts.update({
                where: { id: source_account_id },
                data: {
                    transaction_as_source: {
                        connect: { id: transaction.id }
                    }
                }
            });
    
            await prisma.bank_Accounts.update({
                where: { id: destination_account_id },
                data: {
                    transaction_as_destination: {
                        connect: { id: transaction.id }
                    }
                }
            });
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
            where: {
              id: Number(req.params.id)
            },
            include: {
              source_account: {
                select: {
                  id: true,
                  bank_account_number: true,
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true
                    }
                  }
                }
              },
              destination_account: {
                select: {
                  id: true,
                  bank_account_number: true,
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true
                    }
                  }
                }
              }
            }
          });

        if(!transaction){
            res.status(404).json({message: "Not found"})
            return
        }

        res.status(200).json({message: "Success", data: {...transaction}})
    } catch (error) {
        res.status(500).json({message: "Internal server error", data: error.message})
    }
}

module.exports = { createTransaction, getAllTransactions, getTransactionById }