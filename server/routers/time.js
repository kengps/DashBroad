const express = require("express");

const router = express.Router();
const moment = require('moment')

router.get("/current-time", (req, res) => {
  const currentTime = moment().format("HH:mm");
  res.json({ currentTime });
});
