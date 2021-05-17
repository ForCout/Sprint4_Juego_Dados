DROP SCHEMA IF EXISTS `dados`;
CREATE SCHEMA IF NOT EXISTS `dados` DEFAULT CHARACTER SET utf8mb4 ;

USE `dados`;

CREATE TABLE IF NOT EXISTS `dados`.`jugador` (
    `id` INT  PRIMARY KEY AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL ,
    `fecha` TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS `dados`.`juego` (
    `id` INT  PRIMARY KEY AUTO_INCREMENT,
    `resultado` ENUM('GANAS', 'PIERDES') NOT NULL,
    `dado1` INT NOT NULL ,
    `dados2` INT NOT NULL ,
    `idjugador` INT ,
    FOREIGN KEY (`idjugador`) REFERENCES `dados`.`jugador`(`id`)
);
