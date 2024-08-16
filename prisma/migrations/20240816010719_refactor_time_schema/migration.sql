/*
  Warnings:

  - You are about to drop the column `time` on the `Time` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Time` DROP COLUMN `time`,
    ADD COLUMN `endTime` DATETIME(3) NULL,
    ADD COLUMN `startTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
