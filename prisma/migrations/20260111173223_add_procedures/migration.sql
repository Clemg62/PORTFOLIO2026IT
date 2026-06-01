DROP PROCEDURE IF EXISTS `proc_subscribe_user`;
CREATE PROCEDURE `proc_subscribe_user`(
    IN p_user_id BIGINT,
    IN p_plan_id BIGINT,
    IN p_status VARCHAR(20),
    IN p_start_date DATETIME,
    IN p_end_date DATETIME
)
BEGIN
    INSERT INTO `subscriptions`
        (user_id, plan_id, status, current_period_start, current_period_end, created_at, updated_at)
    VALUES
        (p_user_id, p_plan_id, p_status, p_start_date, p_end_date, NOW(), NOW())
    ON DUPLICATE KEY UPDATE
        plan_id = p_plan_id,
        status = p_status,
        current_period_start = p_start_date,
        current_period_end = p_end_date,
        cancel_at_period_end = FALSE,
        updated_at = NOW();
END;

DROP PROCEDURE IF EXISTS `proc_cancel_subscription`;
CREATE PROCEDURE `proc_cancel_subscription`(IN target_user_id BIGINT)
BEGIN
    UPDATE subscriptions 
    SET 
        auto_renew = FALSE,          
        cancel_at_period_end = TRUE,
        updated_at = NOW()
    WHERE user_id = target_user_id;
END;

DROP PROCEDURE IF EXISTS `proc_archive_user`;
CREATE PROCEDURE `proc_archive_user`(IN target_user_id BIGINT)
BEGIN
    DECLARE v_original_email VARCHAR(255);
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- On vérifie si l'utilisateur existe et n'est pas déjà supprimé
    IF EXISTS (SELECT 1 FROM users WHERE id = target_user_id AND deleted_at IS NULL FOR UPDATE) THEN
        
        -- Récupération de l'email
        SELECT email INTO v_original_email FROM users WHERE id = target_user_id;
        
        -- Gestion de l'abonnement
        -- Si l'utilisateur part, on coupe l'accès immédiatement
        UPDATE subscriptions 
        SET 
            status = 'cancelled', 
            auto_renew = FALSE,
            cancel_at_period_end = TRUE,
            updated_at = NOW()
        WHERE user_id = target_user_id;

        -- Anonymisation RGPD + Soft delete
        UPDATE users 
        SET 
            -- Hachage pour l'unicité mais impossible à inverser
            email = CONCAT('deleted_', LOWER(HEX(SHA2(v_original_email, 256))), '@deleted.local'),
            firstname = 'Utilisateur',
            lastname = 'Anonyme',
            password = '',
            deleted_at = NOW(),
            updated_at = NOW()
        WHERE id = target_user_id;
        
    END IF;

    COMMIT;
END;

DROP PROCEDURE IF EXISTS `proc_cleanup_tokens`;
CREATE PROCEDURE `proc_cleanup_tokens`()
BEGIN
    -- Supprime tous les tokens dont la date d'expiration est passée
    DELETE FROM `tokens` WHERE `expiry` < NOW();

    -- Log le nombre de tokens supprimés pour le monitoring
    SELECT ROW_COUNT() as deleted_tokens;
END;