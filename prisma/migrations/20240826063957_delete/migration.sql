-- AlterTable
ALTER TABLE `Plan` ADD COLUMN `is_deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `PlanPage` ADD COLUMN `is_deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Time` ADD COLUMN `is_deleted` BOOLEAN NOT NULL DEFAULT false;
