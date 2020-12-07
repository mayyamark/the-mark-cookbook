SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `cookbook` DEFAULT CHARACTER SET utf8mb4 ;
USE `cookbook` ;

CREATE TABLE IF NOT EXISTS `cookbook`.`categories` (
  `categoryID` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`categoryID`))
ENGINE = InnoDB;


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


CREATE TABLE IF NOT EXISTS `cookbook`.`ingredients` (
  `ingredientID` INT NOT NULL AUTO_INCREMENT,
  `ingredient` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ingredientID`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `cookbook`.`measures` (
  `measureID` INT NOT NULL AUTO_INCREMENT,
  `measure` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`measureID`))
ENGINE = InnoDB;


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


CREATE TABLE `cookbook`.`images` (
  `imageID` INT NOT NULL AUTO_INCREMENT ,
  `recipeID` INT NOT NULL ,
  `imageName` VARCHAR(500) NOT NULL ,
  PRIMARY KEY (`imageID`),
INDEX `fk_images_recipes1_idx` (`recipeID` ASC),
  CONSTRAINT `fk_images_recipes1_idx`
    FOREIGN KEY (`recipeID`)
    REFERENCES `cookbook`.`recipes` (`recipeID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
