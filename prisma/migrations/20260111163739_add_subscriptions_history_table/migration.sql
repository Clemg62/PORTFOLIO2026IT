DROP TABLE IF EXISTS `subscription_history`;
CREATE TABLE IF NOT EXISTS `subscription_history` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `plan_id` INT NOT NULL, 
    
    `amount_paid` INTEGER NOT NULL DEFAULT 0, 
    `currency` VARCHAR(3) NOT NULL DEFAULT 'EUR',
    
    `period_start` DATETIME NOT NULL,
    `period_end` DATETIME NOT NULL,
    
    `status` VARCHAR(20) NOT NULL,
    `event_type` ENUM('creation', 'renewal', 'upgrade', 'downgrade', 'cancellation', 'reactivation') NOT NULL,
    
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `subscription_history`
    ADD CONSTRAINT `fk_hist_user` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_hist_plan` FOREIGN KEY(`plan_id`) REFERENCES `plans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;