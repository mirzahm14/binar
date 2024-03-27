const router = require("express").Router();
const { createUser, getAllUsers, getUserById } = require("../../controllers/UserController");
const { createAccount, getAllAccounts, getAccountById } = require("../../controllers/AccountController");
const { createTransaction, getAllTransactions, getTransactionById } = require("../../controllers/TransactionController");
//User Routes
router.post("/users", createUser)

router.get("/users", getAllUsers)

router.get("/users/:id", getUserById)

//Account Routes
router.post('/accounts', createAccount)

router.get('/accounts', getAllAccounts)

router.get('/accounts/:id', getAccountById)

//Transaction Routes
router.post('/transactions', createTransaction)

router.get('/transactions', getAllTransactions)

router.get('/transactions/:id', getTransactionById)

module.exports = router;
