import db from '../services/valvulasServices.js'
import express from 'express'
import { body, validationResult } from 'express-validator'

const router = express.Router()

router.post('/', [
    body('idValvula').notEmpty().isNumeric().withMessage('IdValvula inválido'),
    body('segundos').notEmpty().isNumeric().withMessage('segundos inválido')
], async (req, res) =>{

    const errosValidation = validationResult(req)

    if(!errosValidation.isEmpty()){
        return res.status(400).json({erros: errosValidation.array()})
    }

    const {idValvula, segundos} = req.body
    
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

export default router