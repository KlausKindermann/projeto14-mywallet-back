import { Router } from "express";
import {
  createRegistro,
  findRegistros,
} from "../controllers/registros.controllers.js";
import { authRoutesValidation } from "../middlewares/userValidation.middleware.js";
import { registroSchemaValidation } from "../middlewares/registroSchemaValidation.middleware.js";

const router = Router();

router.use(authRoutesValidation);
router.post("/registros", registroSchemaValidation, createRegistro);
router.get("/registro", findRegistros);

export default router;