import pool from './pool.js';

const getAll = async () => {
  const categoriesSql = `
    SELECT *
    FROM categories
  `;

  const categoriesData = await pool.query(categoriesSql);

  const categoriesWithImages = await Promise.all(
    categoriesData.map(async (category) => {
      const { categoryID } = category;
      const imagesSql = `
      SELECT r.name, i.imageID, i.imageName, i.date as 'addDate'
      FROM images i
      JOIN recipes r ON r.recipeID = i.recipeID
      WHERE r.categoryID = ?
      LIMIT 3;
    `;

      const imagesData = await pool.query(imagesSql, [categoryID]);
      return { ...category, images: imagesData };
    }),
  );

  return categoriesWithImages;
};

const getByName = async (categoryName) => {
  const categoriesql = `
    SELECT *
    FROM categories
    WHERE category = ?;
  `;

  const categoriesData = await pool.query(categoriesql, [categoryName]);
  return categoriesData?.[0];
};

const create = async (categoryName) => {
  const insertSql = `
    INSERT INTO categories(category)
    VALUES(?);
  `;

  const insertData = await pool.query(insertSql, [categoryName]);
  return insertData.insertId;
};
export default {
  getAll,
  getByName,
  create,
};
