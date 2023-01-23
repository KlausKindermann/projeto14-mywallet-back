import { registrosCollection } from "../database/db.js";

export async function createRegistro(req, res) {
  const registro = res.locals.registro;

  try {
    await registrosCollection.insertOne(registro);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function findRegistros(req, res) {
  const user = res.locals.user;

  try {
    const registro = await registrosCollection
      .find({ user: user._id })
      .toArray();

    delete user.password;
    res.send({ registro, user });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}