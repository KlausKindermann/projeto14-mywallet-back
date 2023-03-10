import { sessionsCollection, usersCollection } from "../database/db.js";
import { userSchema } from "../models/users.model.js";
import bcrypt from "bcrypt";

export function userSchemaValidation(req, res, next) {
  const user = req.body;

  const { error } = userSchema.validate(user, { abortEarly: false });

  if (error) {
    return res.status(400).send("Usuário ou senha incorretos!");
  }

  res.locals.user = user;

  next();
}

export async function signInBodyValidation(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.sendStatus(401);
    }
    const passwordOk = bcrypt.compareSync(password, user.password);
    if (!passwordOk) {
      return res.sendStatus(401);
    }
    res.locals.user = user;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}

export async function authRoutesValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const session = await sessionsCollection.findOne({ token });
    if (!session) {
      return res.sendStatus(401);
    }
    const user = await usersCollection.findOne({ _id: session?.userId });
    if (!user) {
      return res.sendStatus(401);
    }

    res.locals.user = user;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
