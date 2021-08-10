const { sequelize } = require("../db/db");

const Admin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    res.status(400).json({ error: "Faltan datos" });
  }
  try {
    const user = await sequelize.query(
      `SELECT * FROM usuario WHERE email = '${email}'
        LIMIT 1`,
      { type: sequelize.QueryTypes.SELECT }
    );
    if (user[0].idRol !== 0) return res.status(500).json({ error: "Usuario no autorizado" });
    next();
  } catch (error) {
    res.status(400).json({ error: "Error interno" + error });
  }
  
};

const VerifyUser = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    res.status(400).json({ error: "Faltan datos" });
  }
  try {
    const user = await sequelize.query(
        `SELECT * FROM usuario WHERE email = '${email}'
          LIMIT 1`,
        { type: sequelize.QueryTypes.SELECT }
      );
    if (!user[0]) return res.status(400).json({ error: "Usuario no encontrado" });
    next();
  } catch (error) {
    return res.status(400).json({ error: "Usuario no encontrado" + error });
  }
};

module.exports = {Admin, VerifyUser};
