// Sample Routes and Controllers for the Library System
const { Router } = require('express');
const userController = require('../controllers/user.controller');

module.exports = () => {
    const api = Router();

    // User Routes
    api.post('/', async (req, res) => {
        try {
            const { ok, payLoad, message } = await userController.registerUser(req.body);
            res.status(ok ? 201 : 500).json({ ok, payLoad, message });
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    });

    api.get('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const { ok, payLoad, message } = await userController.getUserById(id);
            res.status(ok ? 200 : 500).json({ ok, payLoad, message });
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    });

    api.put("/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const { ok, payLoad, message } = await userController.updateUser(id, data);
            res.status(ok ? 200 : 500).json({ ok, payLoad, message });
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    })

    api.get('/', async (req, res) => {
        try {
            const { ok, payLoad, message } = await userController.getUsers();
            res.status(ok ? 200 : 500).json({ ok, payLoad, message });
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    });

    api.post("/login", async (req, res) => {
        try {
            const { email, password } = req.body;
            const { ok, payLoad, message } = await userController.loginUser({ email, password });

            if (ok) {
                res.status(201).json({ ok, payLoad });
            } else {
                res.status(500).json({ ok, message });
            }
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    });
    return api;
};