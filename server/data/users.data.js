import pool from './pool.js';

const getByUsername = async (username) => {
  const userSql = `
    SELECT userID, username, password
    FROM users
    WHERE username = ?
  `;

  const userData = await pool.query(userSql, [username]);
  return userData[0];
};

export default {
  getByUsername,
};