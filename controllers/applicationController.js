const db = require("../config/db");

// Apply Job
exports.applyJob = (req, res) => {
    const { job_id, candidate_id } = req.body;

    const sql = `
        INSERT INTO applications (job_id, candidate_id)
        VALUES (?, ?)
    `;

    db.query(sql, [job_id, candidate_id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Job applied successfully",
            applicationId: result.insertId
        });
    });
};

// Get Applications
exports.getApplications = (req, res) => {

    const sql = `
    SELECT
        applications.id,
        jobs.title,
        applications.candidate_id,
        applications.resume,
        applications.ai_score,
        applications.status
    FROM applications
    JOIN jobs
    ON applications.job_id = jobs.id
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

// Upload Resume
exports.uploadResume = (req, res) => {

    const { application_id } = req.body;

    if (!req.file) {
        return res.status(400).json({
            message: "Please upload resume"
        });
    }

    const resume = req.file.path;

    db.query(
        "UPDATE applications SET resume=? WHERE id=?",
        [resume, application_id],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Resume uploaded successfully",
                resume
            });

        }
    );

};