import database from '../database/connection.js'

async function insertSensorValue(valorSensor, id_sensor){
    const conn = await database.connect()

    const sql = 'INSERT INTO tbl_sensor(valorSensor, id_sensor, dataHora) VALUES (?,?, (SELECT NOW()));'

    const data = [valorSensor, id_sensor]

    await conn.query(sql, data)

    conn.end()
}

async function getAllDataSensor(){
    const conn = await database.connect()

    const sql = 'SELECT * FROM tbl_sensor ORDER BY datahora DESC LIMIT 25'

    const [rows] = await conn.query(sql)

    conn.end()

    return rows
}

async function getAllDataSensorCount(){
    const conn = await database.connect()

    const sql = 'SELECT COUNT(*) totalRegistros FROM tbl_sensor ORDER BY datahora DESC'

    const [rows] = await conn.query(sql)

    conn.end()

    return rows
}

async function getAllDataSensorByID(id){
    const conn = await database.connect()

    const sql = `SELECT * FROM tbl_sensor WHERE id_sensor = ${id} ORDER BY datahora DESC`

    const [rows] = await conn.query(sql)

    conn.end()

    return rows
}

async function getLastDataSensor(last){
    const conn = await database.connect()

    const sql = `SELECT * FROM tbl_sensor ORDER BY datahora DESC LIMIT ${last}`

    const [rows] = await conn.query(sql)

    conn.end()

    return rows
}

export default {insertSensorValue, getAllDataSensor, getAllDataSensorCount, getAllDataSensorByID,
                getLastDataSensor}