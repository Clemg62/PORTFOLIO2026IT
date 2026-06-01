DROP TABLE IF EXISTS `plans`;
CREATE TABLE `plans` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL UNIQUE,
    `price` INTEGER NOT NULL COMMENT "En centimes (ex: 999 = 9.99€)",
    `currency` VARCHAR(3) NOT NULL DEFAULT 'EUR',
    `interval_unit` ENUM('day', 'week', 'month', 'year') NOT NULL,
    `interval_count` INTEGER NOT NULL DEFAULT 1,
    `active` BOOLEAN NOT NULL DEFAULT TRUE,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `plans`
    ADD CONSTRAINT `chk_price_positive` CHECK (price >= 0),
    ADD CONSTRAINT `chk_interval_positive` CHECK (interval_count > 0);

INSERT INTO `plans` (`name`, `price`, `currency`, `interval_unit`, `interval_count`, `active`) VALUES
    -- Offre gratuite
    ('Gratuit', 0, 'EUR', 'month', 1, TRUE),

    -- Offre familiale
    ('Offre Familiale', 799, 'EUR', 'month', 1, TRUE),

    -- Offre professionnelle (tarif par résident)
    ('Offre Professionnelle', 449, 'EUR', 'month', 1, TRUE),

    -- Offre institutionnelle (annuelle)
    ('Offre Institutionnelle', 200000, 'EUR', 'year', 1, TRUE);
