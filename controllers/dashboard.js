const DashboardStats = require('../models/Dashboard');

// @desc    Get All Dashboard Data
// @route   GET /api/dashboard/stats
exports.getDashboardStats = async (req, res) => {
  try {
    let stats = await DashboardStats.findOne();

    // Database empty ga unte seed initial stats record
    if (!stats) {
      stats = await DashboardStats.create({
        totalUsers: 1450,
        totalRevenue: 52300.50,
        activeOrders: 42
      });
    }

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};