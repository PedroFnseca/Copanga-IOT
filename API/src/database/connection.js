import mysql from 'mysql2/promise'

async function connect(){
    const connection = await mysql.createConnection({
        host: 'bzzqpyjvvn4vklv2rj2l-mysql.services.clever-cloud.com',
        user: 'ulzltm6wbb6psoj4',
        password: 'CFB7CFtonE7z0HNuLxRk',
        database: 'bzzqpyjvvn4vklv2rj2l'
    })   

    return connection
}


export default {connect}
 