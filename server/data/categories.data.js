import pool from './pool.js';

const getAll = async () => {
  const categoriesSql = `
    SELECT *
    FROM categories
  `;

  const categoriesData = await pool.query(categoriesSql);
  return categoriesData;
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
  const insertSql =  `
    INSERT INTO categories(category)
    VALUES(?);
  `;

  const insertData = await pool.query(insertSql, [categoryName]);
  return  insertData.insertId;
};
export default {
  getAll,
  getByName,
  create,
};