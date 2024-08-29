/*
  Warnings:

  - You are about to drop the column `billId` on the `Bill` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Bill_billId_key` ON `Bill`;

-- AlterTable
ALTER TABLE `Bill` DROP COLUMN `billId`;
