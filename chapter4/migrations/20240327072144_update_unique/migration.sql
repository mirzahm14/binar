/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Bank_Accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bank_Accounts_user_id_key" ON "Bank_Accounts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_user_id_key" ON "Profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
