const Sequelize = require('sequelize');
const path = process.env.PATH;

const sequelize = new Sequelize(path, {
    operatorsAliases: false ,
    logging: true,
});

const dbConnection = async () => {
    sequelize.authenticate().then(() => {
        console.log('Conectado.');
    }).catch(err => {
        console.error('Error de conexion:', err);
    });
}

module.exports = {dbConnection}