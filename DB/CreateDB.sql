SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema libertas
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema libertas
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `libertas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `libertas` ;

-- -----------------------------------------------------
-- Table `libertas`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libertas`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(99) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `libertas`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libertas`.`posts` (
  `id` INT(11) NOT NULL,
  `text` VARCHAR(45) NULL DEFAULT NULL,
  `likes` INT(11) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `type` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `id`
    FOREIGN KEY (`user_id`)
    REFERENCES `libertas`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `libertas`.`subscribers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libertas`.`subscribers` (
  `consumer_id` INT(11) NULL DEFAULT NULL,
  `producer_id` INT(11) NULL DEFAULT NULL,
  `id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_idx` (`consumer_id` ASC) VISIBLE,
  INDEX `id_idx1` (`producer_id` ASC) VISIBLE,
  CONSTRAINT `cid`
    FOREIGN KEY (`consumer_id`)
    REFERENCES `libertas`.`users` (`id`),
  CONSTRAINT `pid`
    FOREIGN KEY (`producer_id`)
    REFERENCES `libertas`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
