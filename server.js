 require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const aiRoutes = require("./routes/aiRoutes");
const dashboardRoutes = require('./routes/dashboard');
const jobRoutes = require('./routes/jobRoutes');


const app = express();

// Middleware
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ 
    extended: true 
}));


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/ai", aiRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/jobs', jobRoutes);


// Test API
app.get("/", (req, res) => {

    res.send("AI Hiring System Backend Running...");

});


// Server
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);

});