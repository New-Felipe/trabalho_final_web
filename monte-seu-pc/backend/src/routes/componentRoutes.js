const express = require("express");
const {
  getComponents
} = require("../controllers/componentController");

const router = express.Router();

router.get("/", getComponents);

module.exports = router;