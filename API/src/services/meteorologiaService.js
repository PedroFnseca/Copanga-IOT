import database from "../database/connection.js";

async function insertMeteorologia(temperatura, umidade) {
  const conn = await database.connect();

  const sql = "INSERT INTO tbl_meteorologia (temperatura, umidade) VALUES (?, ?)";

  conn.query(sql, [temperatura, umidade]);

  conn.end();
}

async function getAllDataMeteorologia() {
  const conn = await database.connect();

  const sql = "SELECT * FROM tbl_meteorologia";

  const [rows] = conn.query(sql);

  conn.end();

  return rows;
}

export default {
  insertMeteorologia,
  getAllDataMeteorologia,
};
