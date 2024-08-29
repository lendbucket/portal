/*
  Warnings:

  - You are about to alter the column `original_amount` on the `Bill` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `paid_total_amount` on the `Bill` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `pending_total_amount` on the `Bill` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Double`.
  - You are about to alter the column `amount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `Bill` MODIFY `original_amount` DOUBLE NOT NULL,
    MODIFY `paid_total_amount` DOUBLE NOT NULL,
    MODIFY `pending_total_amount` DOUBLE NULL;

-- AlterTable
ALTER TABLE `Payment` MODIFY `amount` DOUBLE NOT NULL;
