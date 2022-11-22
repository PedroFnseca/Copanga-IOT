import express from "express";
import sensor from "./controllers/sensorController.js";
import valvula from "./controllers/valvulaController.js";
import meteorologia from "./controllers/meteorologiaController.js";

const router = express.Router();

router.use("/sensor", sensor);
router.use("/valvula", valvula);
router.use("/meteorologia", meteorologia);

router.use("/*", (req, res) => {
  res.status(404).json({ message: "Caminho ou método não encontrado." });
});

export default router;
