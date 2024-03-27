-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bank_Accounts" (
    "id" SERIAL NOT NULL,
    "bank_name" TEXT NOT NULL,
    "bank_account_number" TEXT NOT NULL,
    "balance" DECIMAL(10,2) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Bank_Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "source_account_id" INTEGER NOT NULL,
    "destination_account_id" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profiles" (
    "id" SERIAL NOT NULL,
    "identity_type" INTEGER NOT NULL,
    "identity_number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);
