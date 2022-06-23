import express from 'express'
import routes from './router.js'

const api = express()
api.use(express.json())

api.use('/', routes)

api.listen('3333', () =>{
    console.log('server is running')
})