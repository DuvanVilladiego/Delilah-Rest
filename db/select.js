var express = require("express");
var app = express();
const sequelize = require("./db");

app.use(express.json)

async function findAllRows() {
  sequelize
    .query("SELECT username FROM usuario", { type: sequelize.QueryTypes.SELECT })
    .then((result) => {
      console.log(result);
    })
    .catch((e) => {
      console.log("error  en la insercion " + e);
    });
}

app.get("/", (req, res) => {
    res.json(findAllRows());
});

app.listen(3000, function () {
  console.log("Sistema armado en el puerto 3000!");
});
