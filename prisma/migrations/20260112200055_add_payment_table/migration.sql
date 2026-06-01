DROP TABLE IF EXISTS `payments`;
CREATE TABLE IF NOT EXISTS `payments` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `subscription_id` BIGINT NULL,
    
    `amount` INTEGER NOT NULL COMMENT 'Montant en centimes',
    `currency` VARCHAR(3) NOT NULL DEFAULT 'EUR',
    
    `status` ENUM('PENDING', 'SUCCEEDED', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    
    `provider` VARCHAR(50) NOT NULL DEFAULT 'FAKE', 
    `provider_transaction_id` VARCHAR(255) NULL, 
    
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    
    INDEX `idx_payment_user` (`user_id`),
    INDEX `idx_payment_status` (`status`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `payments`
    ADD CONSTRAINT `fk_payment_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_payment_sub` FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;