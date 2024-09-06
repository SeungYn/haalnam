/*
  Warnings:

  - You are about to drop the column `end_point` on the `WebPushSubscription` table. All the data in the column will be lost.
  - Added the required column `subscription_info` to the `WebPushSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `WebPushSubscription` DROP COLUMN `end_point`,
    ADD COLUMN `subscription_info` VARCHAR(191) NOT NULL;
