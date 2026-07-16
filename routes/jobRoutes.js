const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobsController");


router.post("/create", jobController.createJob);
router.get("/", jobController.getAllJobs);

module.exports = router;