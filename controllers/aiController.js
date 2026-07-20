const db = require("../config/db");

exports.calculateScore = (req, res) => {

    const { application_id } = req.body;

    // Temporary AI Score
    const score = Math.floor(Math.random() * 41) + 60;

    db.query(
        "UPDATE applications SET ai_score=? WHERE id=?",
        [score, application_id],
        (err) => {

            if (err) {
                return res.status(500).json({
                    message: "AI Score update failed",
                    error: err
                });
            }

            res.json({
                message: "AI Score generated successfully",
                ai_score: score
            });

        }
    );

};