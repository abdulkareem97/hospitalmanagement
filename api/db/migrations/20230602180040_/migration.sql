/*
  Warnings:

  - You are about to alter the column `paymentMode` on the `opd` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `opd` MODIFY `paymentMode` VARCHAR(191) NOT NULL;
