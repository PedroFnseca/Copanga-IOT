import db from "../database/connection.js"
import express from "express";

const router = express.Router();

router.get("sensor/:weeks", async (req, res) =>{
  const {weeks} = req.params

  try {
    const data = await db.sensorReport(weeks)

    res.status(201).json(data)
  } catch (error) {
    res.status(500).json({
      msg: error
    })
  }
})

router.get("valvula/:weeks", async (req, res) =>{
  const {weeks} = req.params

  try {
    const data = await db.valvulaReports(weeks)

    res.status(201).json(data)
  } catch (error) {
    res.status(500).json({
      msg: error
    })
  }
})

export default router