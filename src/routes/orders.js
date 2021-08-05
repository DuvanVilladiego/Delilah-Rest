const express = require('express');
const router = express.Router();
const {sequelize} = require('../db/db');

router.post("/createorder", async (req, res) => {
    try {
        const {descripcion, idMetodo_pago} = req.body;
        if (!descripcion || !idMetodo_pago)  {
            res.status(400).json({error: "Faltan datos"});
        }
        let total = 0;
        descripcion.split(",").forEach(element => {
            sequelize
            .query(`SELECT ${element} FROM plato`, { type: sequelize.QueryTypes.SELECT })
            .then((result) => {
                total = total + result.precio;
            })
            .catch((err) => {
                console.log("error al consultar " + err);
            });
        })
        const order = [
            descripcion,
            total,
            idMetodo_pago,
            "1",
            "1"
        ]
        sequelize.query('INSERT INTO`pedido`( `descripcion`, `total`, `idUsuario`, `idEstado`, `idMetodo_pago`) VALUES( ?, ?, ?, ?, ?)',
            { replacements: order, type: sequelize.QueryTypes.INSERT }
            ).then(function (projects) {
                console.log(projects)
            }).then(e => {res.status(200).json({message: "Orden creada con exito"})})
            .catch( error => {
                console.log("error en la creacion " + error)
            })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = router;