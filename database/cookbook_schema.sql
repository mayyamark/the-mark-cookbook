SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `cookbook` DEFAULT CHARACTER SET utf8 ;
USE `cookbook` ;

CREATE TABLE IF NOT EXISTS `cookbook`.`users` (
  `userID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(75) NOT NULL,
  PRIMARY KEY (`userID`))
ENGINE = InnoDB;

INSERT INTO `users` (`userID`, `username`, `password`) VALUES
(1, 'admin', '$2b$10$Ub9V/Qx/jJn7F38HTRtwR.XlPsQ2Cjm.pOnJ15eKmYMJ20GsCyFaK');

CREATE TABLE IF NOT EXISTS `cookbook`.`categories` (
  `categoryID` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`categoryID`))
ENGINE = InnoDB;

INSERT INTO `categories` (categoryID, category) VALUES
(1, 'предястия'),
(2, 'десерти'),
(3, 'салати');

CREATE TABLE IF NOT EXISTS `cookbook`.`recipes` (
  `recipeID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `categoryID` INT NOT NULL,
  `instructions` VARCHAR(500) NOT NULL,
  `date` DATETIME NOT NULL,
  `isDeleted` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`recipeID`),
  INDEX `fk_recipes_categories1_idx` (`categoryID` ASC),
  CONSTRAINT `fk_recipes_categories1_idx`
    FOREIGN KEY (`categoryID`)
    REFERENCES `cookbook`.`categories` (`categoryID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO `recipes` (recipeID, name, categoryID, instructions, date, isDeleted) VALUES
(1, 'Омлет', 1, 'Разбийте яйцата. Изсипете ги на нагорещен тиган. Гответе.', '2020-10-07 18:46:40', 0),
(2, 'Шоколадова торта', 2, 'Смесете всички съставки. Поставете тестото в намазнена и набрашнена тава. Печете на 180 градуса за 40 мин.', '2020-10-08 10:46:40', 0),
(3, 'Шопска салата', 3, 'Нарежете доматите и краставиците. Рендосайте сиренето. Добавете сол, зехтин и оцет на вкус', '2020-12-08 22:17:28', 0);

CREATE TABLE IF NOT EXISTS `cookbook`.`ingredients` (
  `ingredientID` INT NOT NULL AUTO_INCREMENT,
  `ingredient` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ingredientID`))
ENGINE = InnoDB;

INSERT INTO `ingredients` (ingredientID, ingredient) VALUES
(1, 'яйца'),
(2, 'сол'),
(3, 'захар'),
(4, 'шоколад'),
(5,'ванилия'),
(6, 'брашно'),
(7, 'краставици'),
(8, 'домати'),
(9, 'сирене');

CREATE TABLE IF NOT EXISTS `cookbook`.`measures` (
  `measureID` INT NOT NULL AUTO_INCREMENT,
  `measure` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`measureID`))
ENGINE = InnoDB;

INSERT INTO `measures` (measureID, measure) VALUES
(1, 'ч. ч.'),
(2, 'к. ч.'),
(3, 'с. л.'),
(4, 'ч. л.'),
(5, 'гр.'),
(6, 'кг.'),
(7, 'бр.'),
(8, 'мл.'),
(9, 'щипка');

CREATE TABLE IF NOT EXISTS `cookbook`.`recipe_ingredients` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `recipeID` INT NOT NULL,
  `ingredientID` INT NOT NULL,
  `measureID` INT NULL,
  `amount` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_recipe_ingredients_recipes1_idx` (`recipeID` ASC),
  INDEX `fk_recipe_ingredients_ingredients1_idx` (`ingredientID` ASC),
  INDEX `fk_recipe_ingredients_book_measures1_idx` (`measureID` ASC),
  CONSTRAINT `fk_recipe_ingredients_recipes1_idx`
    FOREIGN KEY (`recipeID`)
    REFERENCES `cookbook`.`recipes` (`recipeID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_recipe_ingredients_ingredients1_idx`
    FOREIGN KEY (`ingredientID`)
    REFERENCES `cookbook`.`ingredients` (`ingredientID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_recipe_ingredients_book_measures1_idx`
    FOREIGN KEY (`measureID`)
    REFERENCES `cookbook`.`measures` (`measureID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO `recipe_ingredients` (id, recipeID, ingredientID, measureID, amount) VALUES
(1, 1, 1, 7, 3),
(2, 2, 1, 7, 3),
(3, 2, 2, 9, 1),
(4, 2, 3, 1, 2),
(5, 2, 4, 5, 100),
(6, 3, 7, 5, 200),
(7, 3, 9, 5, 100),
(8, 3, 8, 5, 200);

CREATE TABLE `cookbook`.`images` (
  `imageID` INT NOT NULL AUTO_INCREMENT,
  `recipeID` INT NOT NULL,
  `imageName` VARCHAR(500) NOT NULL,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`imageID`),
INDEX `fk_images_recipes1_idx` (`recipeID` ASC),
  CONSTRAINT `fk_images_recipes1_idx`
    FOREIGN KEY (`recipeID`)
    REFERENCES `cookbook`.`recipes` (`recipeID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO `images` (`imageID`, `recipeID`, `imageName`, `date`) VALUES
(1, 1, '23122020115709_1608717429151.jpg', '2020-12-23 11:57:09'),
(2, 1, '23122020115709_1608717429153.png', '2020-12-23 11:57:09'),
(3, 1, '23122020115709_1608717429165.jpg', '2020-12-23 11:57:09'),
(4, 2, '23122020115623_1608717383614.jpg', '2020-12-23 11:56:23'),
(5, 2, '23122020115623_1608717383645.jpg', '2020-12-23 11:56:23'),
(6, 2, '23122020115623_1608717383647.jpg', '2020-12-23 11:56:23'),
(7, 3, '23122020115549_1608717349844.jpg', '2020-12-23 11:55:49'),
(8, 3, '23122020115549_1608717349850.jpg', '2020-12-23 11:55:49'),
(9, 3, '23122020120012_1608717612080.jpg', '2020-12-23 12:00:12');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
