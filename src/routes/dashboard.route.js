// router.get("/dashboard", getDashboardData);
// Sample Routes and Controllers for the Library System
const { Router } = require('express');
const DashboardController = require('../controllers/dashboard.controller');

module.exports = () => {
    const api = Router();

    // User Routes
    api.get('/', async (req, res) => {
        try {
            const { ok, payLoad, message } = await DashboardController.getDashboardData();
            res.status(ok ? 201 : 500).json({ ok, payLoad, message });
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    });

   
    return api;
};