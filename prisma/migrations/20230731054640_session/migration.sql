/*
  Warnings:

  - You are about to drop the column `account_email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profile_image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profile_nickname` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Account` ADD COLUMN `account_email` VARCHAR(191) NULL,
    ADD COLUMN `expires_in` INTEGER NULL,
    ADD COLUMN `profile_image` TEXT NULL,
    ADD COLUMN `profile_nickname` TEXT NULL,
    ADD COLUMN `refresh_token_expires_in` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `account_email`,
    DROP COLUMN `profile_image`,
    DROP COLUMN `profile_nickname`;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
