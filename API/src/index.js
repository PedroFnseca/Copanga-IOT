import express from 'express'
import routes from './router.js'
import { config } from 'dotenv'
import cors from 'cors'

config()
const api = express()

api.use(express.json())
api.use(cors())

api.use('/', routes)

api.listen(process.env.PORT || 3333, () =>{
    console.log(`server is running in ${port}`)
})