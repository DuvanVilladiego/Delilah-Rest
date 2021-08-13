const { sequelize } = require("../db/db");

const verifyExistOrder = async (req, res, next) => {
    const idPedido = req.params.idPedido;
    if(!idPedido) return res.status(400).send({error: "Faltan datos"});
    try {
        const pedido = await sequelize.query(`SELECT * FROM pedido WHERE idPedido = ${idPedido}`, { type: sequelize.QueryTypes.SELECT });
        if(!pedido[0]) return res.status(404).send({error: "No existe el pedido"});
        next();
    } catch (error) {
        res.status(400).send({message:  "Error en la base de datos", error});
    }

}



module.exports = verifyExistOrder;