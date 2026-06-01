DROP TRIGGER IF EXISTS `trg_subscription_ai`;
CREATE TRIGGER `trg_subscription_ai`
AFTER INSERT ON `subscriptions`
FOR EACH ROW
BEGIN
    DECLARE v_plan_price INT;
    
    SELECT IFNULL(price, 0) INTO v_plan_price FROM plans WHERE id = NEW.`plan_id`;
    
    INSERT INTO `subscription_history` 
    (user_id, plan_id, amount_paid, period_start, period_end, status, event_type, created_at)
    VALUES 
    (NEW.`user_id`, NEW.`plan_id`, v_plan_price, NEW.`current_period_start`, NEW.`current_period_end`, 'paid', 'creation', NOW());
END;

DROP TRIGGER IF EXISTS `trg_subscription_au`;
CREATE TRIGGER `trg_subscription_au`
AFTER UPDATE ON `subscriptions`
FOR EACH ROW
BEGIN
    DECLARE v_plan_price INT;
    DECLARE v_old_plan_price INT;
    DECLARE v_event_type VARCHAR(50) DEFAULT NULL;
    
    -- 1. Changement de plan (upgrade/downgrade)
    IF NEW.`plan_id` != OLD.`plan_id` THEN
        SELECT price INTO v_old_plan_price FROM plans WHERE id = OLD.plan_id;
        SELECT price INTO v_plan_price FROM plans WHERE id = NEW.plan_id;
        
        IF v_plan_price > v_old_plan_price THEN
            SET v_event_type = 'upgrade';
        ELSE
            SET v_event_type = 'downgrade';
        END IF;

    -- 2. Renouvellement (date prolongée, même plan)
    ELSEIF NEW.`current_period_end` > OLD.`current_period_end` 
           AND NEW.`plan_id` = OLD.`plan_id` THEN
        SET v_event_type = 'renewal';

    -- 3. Annulation demandée
    ELSEIF OLD.`auto_renew` = 1 AND NEW.`auto_renew` = 0 THEN
        SET v_event_type = 'cancellation';
        
    -- 4. Réactivation
    ELSEIF OLD.`auto_renew` = 0 AND NEW.`auto_renew` = 1 THEN
        SET v_event_type = 'reactivation';
    END IF;

    IF v_event_type IS NOT NULL THEN
        SELECT IFNULL(price, 0) INTO v_plan_price FROM plans WHERE id = NEW.plan_id;

        INSERT INTO `subscription_history` 
        (user_id, plan_id, amount_paid, period_start, period_end, status, event_type, created_at)
        VALUES 
        (NEW.`user_id`, NEW.`plan_id`, v_plan_price, NEW.`current_period_start`, NEW.`current_period_end`, NEW.`status`, v_event_type, NOW());
    END IF;
END;

DROP TRIGGER IF EXISTS `trg_user_ai`;
CREATE TRIGGER `trg_user_ai`
AFTER INSERT ON `users`
FOR EACH ROW
BEGIN
    DECLARE v_default_plan_id BIGINT;
    
    -- Récupération sécurisée du plan Gratuit
    SELECT id INTO v_default_plan_id FROM plans WHERE name = 'Gratuit' LIMIT 1;
    
    -- Création de l'abonnement Gratuit uniquement si le plan existe
    IF v_default_plan_id IS NOT NULL THEN
        INSERT INTO `subscriptions` 
        (user_id, plan_id, status, current_period_start, current_period_end, cancel_at_period_end)
        VALUES 
        (NEW.`id`, v_default_plan_id, 'active', NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH), FALSE);
    END IF;
END;

DROP TRIGGER IF EXISTS `trg_protect_finished_payments_bu`;
CREATE TRIGGER `trg_protect_finished_payments_bu`
BEFORE UPDATE ON `payments`
FOR EACH ROW
BEGIN
    IF OLD.`status` IN ('SUCCEEDED', 'FAILED', 'REFUNDED') 
       AND NEW.`status` != 'REFUNDED'
       AND NEW.`subscription_id` = OLD.`subscription_id`
    THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Sécurité: Impossible de modifier un paiement déjà finalisé.';
    END IF;

    IF OLD.`amount` != NEW.`amount` THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = "Sécurité: Le montant d'un paiement ne peut jamais être modifié.";
    END IF;
END;
