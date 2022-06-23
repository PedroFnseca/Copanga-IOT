import database from '../database/connection.js'

async function insertSensorValue(valorSensor, id_sensor){
    const conn = await database.connect()

    const sql = 'INSERT INTO tbl_sensor(valorSensor, id_sensor) VALUES (?,?);'

    const data = [valorSensor, id_sensor]

    await conn.query(sql, data)

    conn.end()
}


export default {insertSensorValue}