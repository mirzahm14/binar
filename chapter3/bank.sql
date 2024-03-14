--create database
CREATE DATABASE bank;

--connect db
\c bank

--create customers table
CREATE TABLE customers(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    address VARCHAR(255) NOT NULL
);

--create accounts table
CREATE TABLE accounts(
    accountNumber VARCHAR(18) PRIMARY KEY NOT NULL,
    type VARCHAR(255) NOT NULL,
    balance DECIMAL(15,2) NOT NULL,
    customerId INT NOT NULL,
    FOREIGN KEY (customerId) REFERENCES customers(id)
);

--create transactions table
CREATE TABLE transactions(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    accountNumber VARCHAR(18) NOT NULL,
    FOREIGN KEY (accountNumber) REFERENCES accounts(accountNumber)
);

--CRUD
--Create
INSERT INTO customers(name, email, phone, address) VALUES('Mirza', 'mirza@gmail.com', '081234567890', 'Jakarta');
INSERT INTO customers(name, email, phone, address) VALUES('Budi', 'budi@yahoo.com', '081234561231', 'Bandung');
INSERT INTO customers(name, email, phone, address) VALUES('Jamal', 'jamal@gmail.com', '081234432454', 'Palu');

INSERT INTO accounts(accountNumber, type, balance, customerId) VALUES('123456789101112', 'Savings', 100000000, 1);
INSERT INTO accounts(accountNumber, type, balance, customerId) VALUES('123456789101120', 'Current', 10000000, 1);
INSERT INTO accounts(accountNumber, type, balance, customerId) VALUES('123456789101113', 'Savings', 27500000, 2);
INSERT INTO accounts(accountNumber, type, balance, customerId) VALUES('123456789101114', 'Savings', 30000000, 3);


INSERT INTO transactions(name, type, amount, accountNumber) VALUES('Top up', 'deposit', 500000, '123456789101112');
INSERT INTO transactions(name, type, amount, accountNumber) VALUES('Withdrawal', 'withdrawal', 150000, '123456789101112');
INSERT INTO transactions(name, type, amount, accountNumber) VALUES('Transfer', 'transfer', 100000, '123456789101120');

INSERT INTO transactions(name, type, amount, accountNumber) VALUES('Top up', 'deposit', 75000, '123456789101113');
INSERT INTO transactions(name, type, amount, accountNumber) VALUES('Withdrawal', 'withdrawal', 37500, '123456789101113');
INSERT INTO transactions(name, type, amount, accountNumber) VALUES('Transfer', 'transfer', 25000, '123456789101114');

INSERT INTO transactions(name, type, amount, accountNumber) VALUES('Top up', 'deposit', 150000, '123456789101114');
INSERT INTO transactions(name, type, amount, accountNumber) VALUES('Withdrawal', 'withdrawal', 100000, '123456789101114');

INSERT INTO transactions(name, type, amount, accountNumber) VALUES('Transfer', 'transfer', 150000, '123456789101112');
INSERT INTO transactions(name, type, amount, accountNumber) VALUES('Transfer', 'transfer', 250000, '123456789101113');

--Read
SELECT * FROM customers;
SELECT * FROM accounts;
SELECT * FROM transactions;

--Update
UPDATE customers SET name = 'Mirza Hafiz' WHERE id = 1;
UPDATE accounts SET balance = balance + 5000000 WHERE accountNumber = '123456789101120';
UPDATE transactions SET type = 'Credit' WHERE id = 20;

--Delete
DELETE FROM transactions WHERE id = 13;
DELETE FROM accounts WHERE accountNumber = '123456789101120';