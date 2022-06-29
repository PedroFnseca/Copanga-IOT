import express from 'express'
import sensor from './controllers/sensorController.js'
import valvula from './controllers/valvulaController.js'
import notFound from './controllers/notFound.js'

const router = express.Router()

router.use('/sensor', sensor)
router.use('/valvula', valvula)
router.use('/*', notFound)


export default router