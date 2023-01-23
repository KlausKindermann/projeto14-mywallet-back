import dayjs from "dayjs";
import { registroSchema } from "../models/registros.model.js";

export function registroSchemaValidation(req, res, next) {
  const { value, description, type } = req.body;
  const user = res.locals.user;

  const registro = {
    value,
    description,
    type,
    user: user._id,
    createdAt: dayjs().format("DD/MM/YYYY"),
  };

  const { error } = registroSchema.validate(transaction, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  res.locals.registro = registro;

  next();
}