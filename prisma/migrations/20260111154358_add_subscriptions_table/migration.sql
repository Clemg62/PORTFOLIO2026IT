DROP TABLE IF EXISTS `subscriptions`;
CREATE TABLE IF NOT EXISTS `subscriptions` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL UNIQUE,
    `plan_id` INT NOT NULL,
    
    `status` VARCHAR(20) NOT NULL COMMENT 'active, cancelled, past_due, trialing',
    
    `current_period_start` DATETIME NOT NULL,
    `current_period_end` DATETIME NOT NULL,
    
    `trial_ends_at` DATETIME NULL DEFAULT NULL, 
    
    `cancel_at_period_end` BOOLEAN NOT NULL DEFAULT FALSE,
    `auto_renew` BOOLEAN NOT NULL DEFAULT TRUE,
    
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX `idx_sub_status` (`status`),
    INDEX `idx_sub_end_date` (`current_period_end`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `subscriptions`
    ADD CONSTRAINT `fk_sub_user` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_sub_plan` FOREIGN KEY(`plan_id`) REFERENCES `plans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    ADD CONSTRAINT `chk_dates_logic` CHECK (`current_period_end` >= `current_period_start`);