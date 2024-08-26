/*
  Warnings:

  - Added the required column `default_main_plan_page_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Plan` DROP FOREIGN KEY `Plan_plan_page_id_fkey`;

-- DropForeignKey
ALTER TABLE `Plan` DROP FOREIGN KEY `Plan_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `PlanPage` DROP FOREIGN KEY `PlanPage_userId_fkey`;

-- AlterTable
ALTER TABLE `Plan` MODIFY `plan_page_id` INTEGER NULL,
    MODIFY `user_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `PlanPage` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Time` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `default_main_plan_page_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PlanPage` ADD CONSTRAINT `PlanPage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plan` ADD CONSTRAINT `Plan_plan_page_id_fkey` FOREIGN KEY (`plan_page_id`) REFERENCES `PlanPage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plan` ADD CONSTRAINT `Plan_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
