const express = require("express");
const router = express.Router();
const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../db/db");

router.post("/register", async (req, res) => {
  const { username, nombre, email, telefono, direccion, password, idRol } =
    req.body;
  const user = await sequelize.query(
    `SELECT * FROM usuario WHERE email = '${email}'`,
    { type: sequelize.QueryTypes.SELECT }
  );
  if (user) {
    res.status(400).json({ message: "El correo ya está registrado" });
  }
  if (
    !username ||
    !nombre ||
    !email ||
    !telefono ||
    !direccion ||
    !password ||
    !idRol
  ) {
    res.status(400).json({ error: "Faltan datos" });
  }
  try {
    const password = await bycript.hash(password, 5);
    const user = [
      username,
      nombre,
      email,
      telefono,
      direccion,
      password,
      idRol,
    ];
    sequelize
      .query(
        "INSERT INTO`usuario`( `username`, `nombre`, `email`, `telefono`, `direccion`, `password`,`idRol`) VALUES( ?, ?, ?, ?, ?, ?, ?)",
        { replacements: user, type: sequelize.QueryTypes.INSERT }
      )
      .then(function (projects) {
        console.log(projects);
      })
      .then((e) => {
        res.status(200).json({ message: "Registro exitoso" });
      })
      .catch((error) => {
        console.log("error  en la insercion " + error);
      });
  } catch (error) {
    res.status(400).json({ error: "Error en la insercion" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Faltan datos" });
  }
  try {
    const user = await sequelize.query(
      `SELECT * FROM usuario WHERE email = '${email}'`,
      { type: sequelize.QueryTypes.SELECT }
    );
    if (!user)
      return res.status(400).json({ error: "Correo o Contraseña incorrectos" });
    const hash = await bcrypt.compare(password, user.password);
    if (!hash)
      return res.status(400).json({ error: "Correo o Contraseña incorrectos" });
    const jwtToken = user.generateJwt();
    return res.status(200).json({ token: jwtToken });
  } catch (error) {
    res.status(400).json({ error: "Error al loguear" });
  }
});

module.exports = router;
