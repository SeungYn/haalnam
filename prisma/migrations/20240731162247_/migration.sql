/*
  Warnings:

  - You are about to alter the column `nid` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - Made the column `nickname` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `instagram` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `introduce` TEXT ,
    MODIFY `nid` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `nickname` VARCHAR(255) NOT NULL;
