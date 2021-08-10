const express = require("express");
const router = express.Router();
const {Admin, VerifyUser} = require("../middlewares/auth");
const { sequelize } = require("../db/db");

router.post("/createorder", VerifyUser, async (req, res) => {
  try {
    const { descripcion, idMetodo_pago, idUsuario } = req.body;
    if (!descripcion || !idMetodo_pago || !idUsuario) {
      res.status(400).json({ error: "Faltan datos" });
    }
    let total = 0;
    const descripcion_array = descripcion.split(",");
    for (i = 0; descripcion_array.length > i; i++) {
      let producto = await sequelize.query(
        `SELECT * FROM plato WHERE nombre_plato =  "${descripcion_array[i]}"`,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
      if (!producto)
        return res
          .status(400)
          .json({ error: "Producto no encontrado: " + element });
      total += producto[0].precio;
    }
    const order = [descripcion, total, idUsuario, "1", idMetodo_pago];
    console.log(order);
    sequelize
      .query(
        "INSERT INTO pedido ( `descripcion`, `total`, `idUsuario`, `idEstado`, `idMetodo_pago`) VALUES( ?, ?, ?, ?, ?)",
        { replacements: order, type: sequelize.QueryTypes.INSERT }
      )
      .then(function (projects) {
        console.log(projects);
      })
      .then((e) => {
        res.status(200).json({ message: "Orden creada con exito" });
      })
      .catch((error) => {
        console.log("error en la creacion " + error);
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/updateorder/:idPedido", VerifyUser, Admin, async (req, res) => {
    try {
        const { idPedido } = req.params;
        const { idEstado } = req.body;
        if (!idPedido || !idEstado) {
            return res.status(400).json({ error: "Faltan datos" });
        }
        await sequelize.query(`UPDATE pedido SET idEstado = ${idEstado} WHERE idPedido = ${idPedido}`)
        res.status(200).json({ message: "Orden actualizada con exito" });
    } catch (error) {
        res.status(400).json({ message: "Orden no encontrada" });
    }
})

module.exports = router;