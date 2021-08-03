const express = require("express");
const router = express.Router();
const { sequelize } = require("../../db/db");

router.get("/list", async (req, res) => {
  try {
    sequelize
      .query(`SELECT * FROM plato`, { type: sequelize.QueryTypes.SELECT })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("error al consultar " + err);
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
