import pool from './pool.js';

const getAll = async () => {
  const availableRecipesSql = `
    SELECT r.recipeID AS 'recipeID', r.name AS 'recipeName', t.category, r.date AS 'addDate', isDeleted
    FROM recipes r
    JOIN categories t ON r.categoryID = t.categoryID
    WHERE isDeleted = 0
    ORDER BY r.recipeID ASC;
  `;

  const availableRecipesData = await pool.query(availableRecipesSql);

  const deletedRecipesSql = `
    SELECT r.recipeID AS 'recipeID', r.name AS 'recipeName', t.category, r.date AS 'addDate', isDeleted
    FROM recipes r
    JOIN categories t ON r.categoryID = t.categoryID
    WHERE isDeleted = 1
    ORDER BY r.recipeID ASC;
  `;

  const deletedRecipesData = await pool.query(deletedRecipesSql);

  return { available: availableRecipesData, deleted: deletedRecipesData };
};

const searchBy = async (
  name = undefined,
  category = undefined,
  order = undefined,
) => {
  let recipesSql = `
      SELECT r.recipeID AS 'recipeID', r.name AS 'recipeName', t.category, r.date AS 'addDate', isDeleted
      FROM recipes r
      JOIN categories t ON r.categoryID = t.categoryID
  `;

  if (name & category) {
    recipesSql += `WHERE r.name LIKE '%${name}% AND t.category LIKE '${category}' `;
  } else if (name) {
    recipesSql += `WHERE r.name LIKE '%${name}%' `;
  } else if (category) {
    recipesSql += `WHERE t.category LIKE '${category}' `;
  }

  if (order) {
    recipesSql += `ORDER BY r.name ${order};`;
  } else {
    recipesSql += 'ORDER BY r.recipeID ASC;';
  }

  return await pool.query(recipesSql);
};


export default {
  getAll,
  searchBy,
};
