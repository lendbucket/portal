/*
  Warnings:

  - You are about to alter the column `original_amount` on the `Bill` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `paid_total_amount` on the `Bill` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `pending_total_amount` on the `Bill` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `amount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `Bill` MODIFY `original_amount` DECIMAL(10, 2) NOT NULL,
    MODIFY `paid_total_amount` DECIMAL(10, 2) NULL,
    MODIFY `pending_total_amount` DECIMAL(10, 2) NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Payment` MODIFY `amount` DECIMAL(10, 2) NOT NULL;
