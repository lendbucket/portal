-- AlterTable
ALTER TABLE `User` ADD COLUMN `idv_status` VARCHAR(191) NULL,
    ADD COLUMN `is_verified` BOOLEAN NULL,
    ADD COLUMN `most_recent_idv_session` VARCHAR(191) NULL;
