const express = require("express")
const sequelize = require("./db/db")
require ("dotenv").config()

const app = express()

app.use(express.json())

//endpoints


app.listen(process.env.PORT, () => {console.log("Backend server listening on port " + process.env.PORT)})