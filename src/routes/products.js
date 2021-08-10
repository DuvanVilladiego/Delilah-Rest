const express = require("express");
const router = express.Router();
const {Admin, VerifyUser} = require("../middlewares/auth");
const {verifyExistProducts,verifyNoExistProducts} = require("../middlewares/products");
const { sequelize } = require("../db/db");

router.get("/list", VerifyUser, async (req, res) => {
  try {
    const products = await sequelize.query(`SELECT * FROM plato`, {
      type: sequelize.QueryTypes.SELECT,
    });
    return res.status(200).json({ productos: products});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/create", verifyNoExistProducts, VerifyUser, Admin, async (req, res) => {
  const { nombre_plato, precio } = req.body;
  if (!nombre_plato || !precio) {
    return res.status(400).json({ message: "Faltan datos" });
  }
  const producto = [nombre_plato, precio];
  try {
    const product = await sequelize.query(`INSERT INTO plato (nombre_plato, precio) VALUES (?,?)`, {
      replacements: producto,
      type: sequelize.QueryTypes.INSERT,
    });
    return res.status(200).json({ message: "Producto creado con exito"});
  } catch (error) {
    res.status(400).json({ error: "Error al crear el plato " + error.message });
  }
});

router.put("/update/:idPlato", verifyExistProducts, VerifyUser, Admin, async (req, res) => {
  const { nombre_plato, precio } = req.body;
  const idPlato = req.params.idPlato; 
  if (!nombre_plato || !precio) {
    return res.status(400).json({ message: "Faltan datos" });
  }
  const producto = [nombre_plato, precio];
  try {
    await sequelize.query(`UPDATE plato SET nombre_plato = "${nombre_plato}", precio = "${precio}" WHERE idPlato = "${idPlato}"`, {
      replacements: producto,
      type: sequelize.QueryTypes.UPDATE,
    });
    return res.status(200).json({ message: "Producto actualizado con exito"});
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar el plato " + error.message });
  }
});

router.delete("/delete/:idPlato", verifyExistProducts, VerifyUser, Admin, async (req, res) => {
  const idPlato = req.params.idPlato;
  try {
    await sequelize.query(`DELETE FROM plato WHERE idPlato = "${idPlato}"`, {
      type: sequelize.QueryTypes.DELETE,
    });
    return res.status(200).json({ message: "Producto eliminado con exito"});
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar el plato " + error.message });
  }
});

module.exports = router;
