import mysql from 'mysql2/promise'

async function connect(){
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'bd_copanga'
    })   

    return connection
}


export default {connect}
 