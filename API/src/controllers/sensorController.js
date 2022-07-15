import db from '../services/sensorServices.js'
import express from 'express'
import { body, validationResult } from 'express-validator'

const router = express.Router()
const keyApi = 'valueKey'

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

    if(key != keyApi) res.status(401).end()
    
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

router.get('/allData',[
    body('key').notEmpty().withMessage('key vazia')
], async (req, res)=>{

    const errosValidation = validationResult(req)

    if(!errosValidation.isEmpty()){
        return res.status(400).json({erros: errosValidation.array()})
    }

    const {key} = req.body

    if(key != keyApi) res.status(401).end()

    try {
        const results = await db.getAllDataSensor()

        if(results.length == 0){
            res.status(204).end() // code 204 para sem conteudo
        }
        else{
            res.status(200).json(results)
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/allDataCount',[
    body('key').notEmpty().withMessage('key vazia')
], async (req, res)=>{

    const errosValidation = validationResult(req)

    if(!errosValidation.isEmpty()){
        return res.status(400).json({erros: errosValidation.array()})
    }

    const {key} = req.body

    if(key != 'valueKey') res.status(401).end()

    try {
        const results = await db.getAllDataSensorCount()
        res.status(200).json(results[0])
    
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/allDataId',[
    body('key').notEmpty().withMessage('key vazia'),
    body('idSensor').notEmpty().isNumeric().withMessage('id inválido')
], async (req, res)=>{

    const errosValidation = validationResult(req)

    if(!errosValidation.isEmpty()){
        return res.status(400).json({erros: errosValidation.array()})
    }

    const {key, idSensor} = req.body

    if(key != 'valueKey') res.status(401).end()

    try {
        const results = await db.getAllDataSensorByID(idSensor)

        if(results.length == 0){
            res.status(204).end() // code 204 para sem conteudo
        }
        else{
            res.status(200).json(results)
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/lastData',[
    body('key').notEmpty().withMessage('key vazia'),
    body('last').notEmpty().withMessage('Last invalido')
], async (req, res)=>{

    const errosValidation = validationResult(req)

    if(!errosValidation.isEmpty()){
        return res.status(400).json({erros: errosValidation.array()})
    }

    const {key, last} = req.body

    if(key != 'keyValue') res.status(401).end()

    try {
        const results = await db.getLastDataSensor(last)

        if(results.length == 0){
            res.status(204).end() // code 204 para sem conteudo
        }
        else{
            res.status(200).json(results)
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router