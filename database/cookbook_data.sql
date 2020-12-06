START TRANSACTION;
USE `cookbook` ;

INSERT INTO `categories` (categoryID, category) VALUES
(1, 'предястия'),
(2, 'десерти');

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

INSERT INTO `ingredients` (ingredientID, ingredient) VALUES
(1, 'яйца'),
(2, 'сол'),
(3, 'захар'),
(4, 'шоколад'),
(5,'ванилия'),
(6, 'брашно');

INSERT INTO `recipes` (recipeID, name, categoryID, instructions, date, isDeleted) VALUES
(1, 'Омлет', 1, 'Разбийте яйцата. Изсипете ги на нагорещен тиган. Гответе.', '2020-10-07 18:46:40', 1),
(2, 'Шоколадова торта', 2, 'Смесете всички съставки. Поставете тестото в намазнена и набрашнена тава. Печете на 180 градуса за 40 мин.', '2020-10-08 10:46:40', 0);


INSERT INTO `recipe_ingredients` (id, recipeID, ingredientID, measureID, amount) VALUES
(1, 1, 1, 7, 3),
(2, 2, 1, 7, 3),
(3, 2, 2, 9, 1),
(4, 2, 3, 1, 2),
(5, 2, 4, 5, 100);

INSERT INTO `images` (`imageID`, `recipeID`, `url`) VALUES
(1, 1, 'https://food-images.files.bbci.co.uk/food/recipes/cheeseomelette_80621_16x9.jpg'),
(2, 2, 'https://nashiterecepti.com/content/NV8xMjU1N19qcGdfODAwXzgwMF8w/mnogo-shokoladova-torta-bejlis.png');
COMMIT;
