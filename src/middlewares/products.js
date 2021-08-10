const { sequelize } = require("../db/db");

const verifyExistProducts = async (req, res, next) => {
    const idPlato = req.params.idPlato;
    if(!idPlato) return res.status(400).send({error: "Faltan datos"});
    try {
        const plato = await sequelize.query(`SELECT * FROM plato WHERE id = "${idPlato}"`, { type: sequelize.QueryTypes.SELECT });
        if(!plato[0]) return res.status(404).send({error: "No existe el plato"});
        next();
    } catch (error) {
        res.status(400).send({message:  "Error en la base de datos", error});
    }

}

const verifyNoExistProducts = async (req, res, next) => {
    const {nombre_plato} = req.body;
    if(!nombre_plato) return res.status(400).send({error: "Faltan datos"});
    try {
        const plato = await sequelize.query(`SELECT * FROM plato WHERE nombre_plato = "${nombre_plato}"`, { type: sequelize.QueryTypes.SELECT });
        if(plato[0]) return res.status(404).send({error: "El plato ya existe"});
        next();
    } catch (error) {
        res.status(400).send({message:  "Error en la base de datos", error});
    }

}

module.exports = {verifyExistProducts,verifyNoExistProducts};