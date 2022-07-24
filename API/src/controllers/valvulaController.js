import db from '../services/valvulasServices.js'
import express from 'express'
import { body, validationResult } from 'express-validator'

const router = express.Router()
const keyApi = 'valueKey'

router.post('/', [
    body('idValvula').notEmpty().isNumeric().withMessage('IdValvula inválido'),
    body('segundos').notEmpty().isNumeric().withMessage('segundos inválido'),
    body('key').notEmpty().withMessage('Key vazia')
], async (req, res) =>{

    const errosValidation = validationResult(req)

    if(!errosValidation.isEmpty()){
        return res.status(400).json({erros: errosValidation.array()})
    }

    const {idValvula, segundos, key} = req.body

    if(key != keyApi) res.status(401).end()
    
    try {
        await db.inserValvula(idValvula, segundos)

        res.status(201).json({
            msg: 'Cadastrado com sucesso'
        })
    } catch (err) {
        res.status(500).json({
            err
        })
    }
})

router.get('/allData', async (req, res) =>{

    try {
        const results = await db.getAllDataValvula()

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

router.get('/allDataCount', async (req, res)=>{

    try {
        const results = await db.getAllDataValvulaCount()
        res.status(200).json(results[0])
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/allDataId',[
    body('idSensor').notEmpty().isNumeric().withMessage('id inválido')
], async (req, res)=>{

    const errosValidation = validationResult(req)

    if(!errosValidation.isEmpty()){
        return res.status(400).json({erros: errosValidation.array()})
    }

    const {idSensor} = req.body

    try {
        const results = await db.getAllDataValvulaByID(idSensor)

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
    body('last').notEmpty().withMessage('Last invalido')
], async (req, res)=>{

    const errosValidation = validationResult(req)

    if(!errosValidation.isEmpty()){
        return res.status(400).json({erros: errosValidation.array()})
    }

    const {last} = req.body

    try {
        const results = await db.getLastDataValvula(last)

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