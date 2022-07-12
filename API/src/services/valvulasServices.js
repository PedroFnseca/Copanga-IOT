import database from '../database/connection.js'

async function inserValvula(id_valvula, segundos){
    const conn = await database.connect()

    const sql = 'INSERT INTO tbl_valvula(id_valvula, acionado, desligado) value (?, (select now() - interval ? second), (select now()))'
    
    const data = [id_valvula, segundos]

    await conn.query(sql, data)

    conn.end()
}

async function getAllDataValvula(){
    const conn = await database.connect()

    const sql = 'SELECT * FROM tbl_valvula'

    const [rows] = await conn.query(sql)

    conn.end()

    return rows
}

async function getAllDataValvulaCount(){
    const conn = await database.connect()

    const sql = 'SELECT COUNT(*) totalRegistros FROM tbl_valvula'

    const [rows] = await conn.query(sql)

    conn.end

    return rows
}

export default {inserValvula, getAllDataValvula, getAllDataValvulaCount}
