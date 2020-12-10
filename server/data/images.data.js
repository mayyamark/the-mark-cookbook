import pool from './pool.js';

const add = async (recipeID, filesData) => {
  try {
    const imagesData = Promise.all(
      filesData.map(async (file) => {
        const addDate = new Date();
        const { filename } = file;

        const insertSql = `
        INSERT INTO images(recipeID, imageName, date)
        VALUES(?, ?, ?);
      `;

        const insertData = await pool.query(insertSql, [
          recipeID,
          filename,
          addDate,
        ]);

        return {
          imageID: insertData.insertId,
          imageName: filename,
          addDate,
        };
      }),
    );

    return imagesData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const remove = async (imageID) => {
  try {
    const removeSql = `
      DELETE FROM images
      WHERE imageID = ?
    `;

    await pool.query(removeSql, [imageID]);
    return imageID;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  add,
  remove,
};
