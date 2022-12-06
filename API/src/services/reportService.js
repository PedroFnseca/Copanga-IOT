import database from '../database/connection.js'

async function sensorReport(weeks){
  const days = weeks * 7

  const conn = await database.connect()

  const sql = "SELECT * FROM tbl_sensor WHERE datahora BETWEEN DATE_SUB(NOW(), INTERVAL ? DAY) AND NOW() ORDER BY datahora DESC"

  const [rows] = await conn.query(sql, days)

  conn.end()
  return rows
}

async function valvulaReports(weeks){
  const days = weeks * 7

  const conn = await database.connect()

  const sql = "SELECT * FROM tbl_valvula WHERE datahora BETWEEN DATE_SUB(NOW(), INTERVAL ? DAY) AND NOW() ORDER BY datahora DESC"

  const [rows] = await conn.query(sql, days)

  conn.end()
  return rows
}

export default {
  sensorReport,
  valvulaReports
}