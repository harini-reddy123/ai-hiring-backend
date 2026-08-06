// backend/routes/jobRoutes.js
const express = require('express');
const router = express.Router();

// Sample / DB query for recent jobs
router.get('/recent', async (req, res) => {
  try {
    // Database table nundi top 5 recent jobs fetch cheyadaniki logic
    const recentJobs = [
      { id: 1, title: 'Frontend Developer', company: 'TechCorp', location: 'Hyderabad', salary: '₹8,00,000/yr', type: 'Full-Time' },
      { id: 2, title: 'React Developer', company: 'InnoSys', location: 'Bangalore', salary: '₹10,00,000/yr', type: 'Remote' },
      { id: 3, title: 'Node.js Backend Engineer', company: 'CloudData', location: 'Remote', salary: '₹12,00,000/yr', type: 'Full-Time' }
    ];

    res.json({ success: true, data: recentJobs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;