const express = require('express');
const router = express.Router();
// const bycript = require('bcrypt');
// const jwt = require('jsonwebtoken');
const {sequelize} = require('../../db/db');

router.post("/register", async (req, res) => {
    const {username, nombre, email, telefono, direccion, password, idRol} = req.body
    if (!username || !nombre || !email || !telefono || !direccion || !password || !idRol) {
        res.status(400).json({error: "Faltan datos"});
    } else {
        try {
            const user = [
                username,
                nombre,
                email,
                telefono,
                direccion,
                password,
                idRol
            ]
            sequelize.query('INSERT INTO`usuario`( `username`, `nombre`, `email`, `telefono`, `direccion`, `password`,`idRol`) VALUES( ?, ?, ?, ?, ?, ?, ?)',
            { replacements: user, type: sequelize.QueryTypes.INSERT }
            ).then(function (projects) {
                console.log(projects)
            }).then(e => {res.status(200).json({message: "Registro exitoso"})})
            .catch( error => {
                console.log("error  en la insercion " + error)
            })
            
        } catch (error) {
            res.status(400).json({error: "Error en la insercion"});
        }
    }
    
    
})

module.exports = router;