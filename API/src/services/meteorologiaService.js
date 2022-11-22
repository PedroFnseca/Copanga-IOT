import database from "../database/connection.js";

async function insertMeteorologia(dataHora, temperatura, umidade) {
  const conn = await database.connect();

  const sql =
    "INSERT INTO tbl_meteorologia (datahora, temperatura, umidade) VALUES (?, ?, ?)";

  const data = [dataHora, temperatura, umidade];

  conn.query(sql, data);

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
