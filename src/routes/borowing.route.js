// Sample Routes and Controllers for the Library System
const { Router } = require('express');
const borrowingRecordController = require('../controllers/borowing.controller');

module.exports = () => {
    const api = Router();

    // Borrowing Record Routes
    api.post('/', async (req, res) => {
        try {
            const { ok, payLoad, message } = await borrowingRecordController.borrowBook(req.body);
            res.status(201 ).json({ ok, payLoad, message });
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    });

    api.post('/return', async (req, res) => {
        try {
            const { recordId } = req.body;
            const { ok, payLoad, message } = await borrowingRecordController.returnBook(recordId);
            res.status(ok ? 200 : 500).json({ ok, payLoad, message });
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    });


    api.post('/pay-fine', async (req, res) => {
        try {
            const data = req.body;
            const { ok, payLoad, message } = await borrowingRecordController.payFine(data);
            res.status(ok ? 200 : 400).json({ ok, payLoad, message });
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    });


    api.get("/", async (req, res) => {
        try {
            const { ok, payLoad, message } = await borrowingRecordController.getAll();
            res.status(ok ? 200 : 400).json({ ok, payLoad, message });
        } catch (error) {
            res.status(500).json({ ok: false, message: "Internal Server Error" });
        }
    });

    api.get('/user/:userId', async (req, res) => {
        try {
            const { userId } = req.params;
            const { ok, payLoad, message } = await borrowingRecordController.getUserRecords(userId);

            res.status(ok ? 200 : 500).json({ ok, payLoad, message });
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    });


    // api.post('/borrow', async (req, res) => {
    //     try {
    //         const { ok, payLoad, message } = await bookController.borrowBook(req.body);
    //         res.status(ok ? 201 : 400).json({ ok, payLoad, message });
    //     } catch (error) {
    //         res.status(500).json({ ok: false, message: error.message });
    //     }
    // });
    // api.post('/return', async (req, res) => {
    //     try {
    //         const { ok, payLoad, message } = await bookController.returnBook(req.body);
    //         res.status(ok ? 200 : 400).json({ ok, payLoad, message });
    //     } catch (error) {
    //         res.status(500).json({ ok: false, message: error.message });
    //     }
    // });
    return api;
};