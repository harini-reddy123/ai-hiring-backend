const express = require("express");
const router = express.Router();

const { calculateScore } = require("../controllers/aiController");

router.post("/score", calculateScore);

module.exports = router;