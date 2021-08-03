const express = require("express");
const sequelize = require("./db/db");
require("dotenv").config();

const app = express();

async function findUsername() {
  sequelize
    .query("SELECT username FROM usuario where username ='pedrito123'", {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((result) => {
      console.log(result);
    })
    .catch((e) => {
      console.log("error  en la insercion " + e);
    });
}

app.use(express.json());

//endpoints
app.get("/", (req, res) => {
    console.log(findUsername());
  if (findUsername() == [] || !findUsername()) {
   return res.status(400).json({msg: "Usuario existente!"});
  }
  else{
    res.status(200).json({msg: "Usuario created"});

  }
});

app.listen(process.env.PORT, () => {
  console.log("Backend server listening on port " + process.env.PORT);
});
