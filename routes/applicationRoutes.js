const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const {
    applyJob,
    getApplications,
    uploadResume
} = require("../controllers/applicationController");

router.post("/apply", applyJob);

router.get("/", getApplications);

router.post(
    "/upload-resume",
    upload.single("resume"),
    uploadResume
);

module.exports = router;