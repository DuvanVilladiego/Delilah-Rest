const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../db/db");

router.post("/register", async (req, res) => {
  const { username , nombre, email, telefono, direccion, password } = req.body;
  let {idRol} = req.body;
  if(!idRol) idRol = "1";
  const user = await sequelize.query(
    `SELECT * FROM usuario WHERE email = '${email}'`,
    { type: sequelize.QueryTypes.SELECT }
  );
  if (user && user.length > 0) {
    return res.status(400).json({ message: "El correo ya está registrado" });
  }
  if (
    !username ||
    !nombre ||
    !email ||
    !telefono ||
    !direccion ||
    !password 
  ) {
    return res.status(400).json({ error: "Faltan datos" });
  }
  try {
    const pass = await bcrypt.hash(password, 5);
    const user = [
      username,
      nombre,
      email,
      telefono,
      direccion,
      pass,
      idRol,
    ];
    sequelize
      .query(
        "INSERT INTO`usuario`( `username`, `nombre`, `email`, `telefono`, `direccion`, `password`,`idRol`) VALUES( ?, ?, ?, ?, ?, ?, ?)",
        { replacements: user, type: sequelize.QueryTypes.INSERT }
      )
      const jwtToken = await jwt.sign({
        username: user[username],
        nombre: nombre,
        email: email,
        telefono: telefono,
        direccion: direccion,
        idRol: idRol,
      }, process.env.SECRET_kEY_JWT)
      return res.status(200).json({ token: jwtToken });
  } catch (error) {
    return res.status(400).json({ error: "Error en la insercion" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Faltan datos" });
  } 
  try {
    let user = await sequelize.query(
      `SELECT * FROM usuario WHERE email = '${email}'
      LIMIT 1`,
      { type: sequelize.QueryTypes.SELECT }
    );
    user = user[0];
    if (!user) return res.status(400).json({ error: "Correo o Contraseña incorrectos" });
    const hash = await bcrypt.compare(password, user.password);
    if (!hash) return res.status(400).json({ error: "Correo o Contraseña incorrectos" });
    const jwtToken = await jwt.sign({
      username: user.username,
      nombre: user.nombre,
      email: user.email,
      telefono: user.telefono,
      direccion: user.direccion,
      idRol: user.idRol,
    }, process.env.SECRET_kEY_JWT)
    return res.status(200).json({ token: jwtToken });
  } catch (error) {
    res.status(400).json({ error: "Error al loguear" });
  }
});

module.exports = router;
