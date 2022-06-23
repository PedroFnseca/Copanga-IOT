import db from '../services/sensorServices.js'
import express from 'express'

const router = express.Router()

router.post('/', async (req, res) =>{

    const {valorSensor, id_sensor} = req.body

    try{
        await db.insertSensorValue(valorSensor, id_sensor)

        res.status(201).json({
            msg: 'Registrado com exito'
        })
    }
    catch(err){
        res.status(500).json({
            msg: err
        })
    }
})


export default router