import express from 'express'
import routes from './router.js'

const api = express()
api.use(express.json())
const port = 3333

api.use('/', routes)

api.listen(process.env.PORT || port, () =>{
    console.log(`server is running in ${port}`)
})