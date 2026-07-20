const db = require("../config/db");

// Create Job (HR)
exports.createJob = async (req, res) => {

    const { title, description, skills, location, salary, created_by } = req.body;

    try {

        const sql = `
        INSERT INTO jobs 
        (title, description, skills, location, salary, created_by)
        VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [title, description, skills, location, salary, created_by],
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        message: "Job creation failed",
                        error: err
                    });
                }

                res.status(201).json({
                    message: "Job created successfully",
                    jobId: result.insertId
                });

            }
        );

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error
        });

    }
};


// Get All Jobs
exports.getJobs = async (req, res) => {

    try {

        const sql = "SELECT * FROM jobs ORDER BY created_at DESC";

        db.query(sql, (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Cannot fetch jobs",
                    error: err
                });
            }

            res.json(result);

        });


    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error
        });

    }
};


// Get Single Job
exports.getJobById = async (req, res) => {

    const { id } = req.params;

    try {

        const sql = "SELECT * FROM jobs WHERE id=?";

        db.query(sql, [id], (err, result)=>{

            if(err){
                return res.status(500).json({
                    message:"Error fetching job",
                    error:err
                });
            }


            res.json(result[0]);

        });


    } catch(error){

        res.status(500).json({
            message:"Server error",
            error
        });

    }
};