import db from '../services/valvulasServices.js'
import express from 'express'

const router = express.Router()

router.post('/', async (req, res) =>{
    const {id_valvula, segundos} = req.body
    
    try {
        await db.inserValvula(id_valvula, segundos)

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