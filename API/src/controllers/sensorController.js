import db from '../services/sensorServices.js'
import express from 'express'
import { body, validationResult } from 'express-validator'

const router = express.Router()

router.post('/', [
    body('idSensor').notEmpty().isNumeric().withMessage('idSensor invalido'),
    body('valorSensor').notEmpty().isNumeric().withMessage('valorSensor inválido'),
    body('key').notEmpty().withMessage('Key vazia')
], async (req, res) =>{

    const errosValidation = validationResult(req)

    if(!errosValidation.isEmpty()){
        return res.status(400).json({erros: errosValidation.array()})
    }

    const {valorSensor, idSensor, key} = req.body

    if(key != 'valueKey'){
        return res.status(401).end()
    }

    try{
        await db.insertSensorValue(valorSensor, idSensor)

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