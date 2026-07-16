const db = require("../config/db");
exports.createJob = (req, res) => {

    const {
        job_title,
        company_name,
        location,
        salary,
        experience,
        required_skills,
        job_description,
        posted_by
    } = req.body;

    const sql = `
        INSERT INTO jobs
        (job_title, company_name, location, salary, experience, required_skills, job_description, posted_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            job_title,
            company_name,
            location,
            salary,
            experience,
            required_skills,
            job_description,
            posted_by
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Job Created Successfully"
            });

        }
    );

};

exports.getAllJobs = (req, res) => {

    const sql = "SELECT * FROM jobs ORDER BY created_at DESC";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            jobs: result
        });

    });

};