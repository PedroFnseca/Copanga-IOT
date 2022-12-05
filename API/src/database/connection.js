import mysql from 'mysql2/promise'

async function connect(){
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'db_copanga'
    })   

    return connection
}

export default {connect}
