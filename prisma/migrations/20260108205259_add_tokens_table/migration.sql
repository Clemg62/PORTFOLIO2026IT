DROP TABLE IF EXISTS `tokens`;
CREATE TABLE IF NOT EXISTS `tokens` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `hash` BINARY(32) NOT NULL UNIQUE,
    `user_id` BIGINT NOT NULL,
    `expiry` DATETIME(3) NULL DEFAULT NULL,
    `scope` ENUM('ACTIVATION', 'AUTHENTICATION', 'PASSWORD_RESET') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    
    INDEX `idx_token_user` (`user_id`),
    INDEX `idx_token_expiry` (`expiry`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `tokens`
    ADD CONSTRAINT `fk_token_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
