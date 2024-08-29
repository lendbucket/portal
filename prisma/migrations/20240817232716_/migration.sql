-- AlterTable
ALTER TABLE `Bill` MODIFY `original_amount` DECIMAL(65, 30) NOT NULL,
    MODIFY `paid_total_amount` DECIMAL(65, 30) NOT NULL,
    MODIFY `pending_total_amount` DECIMAL(65, 30) NULL;

-- AlterTable
ALTER TABLE `Payment` MODIFY `amount` DECIMAL(65, 30) NOT NULL;
