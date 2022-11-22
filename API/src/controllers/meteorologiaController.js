import db from "../services/meteorologiaService.js";
import express from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/",
  [
    body("umidade").notEmpty().isNumeric(),
    body("temperatura").notEmpty().isNumeric(),
  ],
  async (req, res) => {
    const errosValidation = validationResult(req);

    if (!errosValidation.isEmpty()) {
      return res.status(400).json({ erros: errosValidation.array() });
    }

    const { umidade, temperatura} = req.body;

    try {
      await db.insertMeteorologia(temperatura, umidade);

      res.status(201).json({
        msg: "Registrado com exito",
      });
    } catch (error) {
      res.status(500).json({
        msg: error,
      });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const data = await db.getAllDataMeteorologia();

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
});

export default router;
