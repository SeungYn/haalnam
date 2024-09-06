/*
  Warnings:

  - A unique constraint covering the columns `[endpoint]` on the table `WebPushSubscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endpoint` to the `WebPushSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `WebPushSubscription` ADD COLUMN `endpoint` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `WebPushSubscription_endpoint_key` ON `WebPushSubscription`(`endpoint`);
