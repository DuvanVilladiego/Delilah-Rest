const express = require("express");
const { sequelize } = require("./db/db");
require("dotenv").config();

//endpoints
const Auth = require("./src/routes/auth");
const Orders = require("./src/routes/orders");
const Products = require("./src/routes/products");

const app = express();

app.use(express.json());

app.use("/api/auth/", Auth);
app.use("/api/orders/", Orders);
app.use("/api/products/", Products);

app.listen(process.env.PORT, () => {
  console.log("Backend server listening on port " + process.env.PORT);
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log("Error connecting to database: " + err);
  });
