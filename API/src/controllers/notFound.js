import express from 'express'

const router = express.Router()

router.use('/', (req, res) =>{
  res.status(404).json({
    msg: "Caminho ou método incorreto"
  })
})

export default router