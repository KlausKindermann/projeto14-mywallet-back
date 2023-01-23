import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import registroRoutes from "./routes/registro.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(registroRoutes);

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));