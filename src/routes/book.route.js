// Sample Routes and Controllers for the Library System
const { Router } = require('express');
const bookController = require('../controllers/book.controller');

module.exports = () => {
    const api = Router();
    // Book Routes
    api.post('/', async (req, res) => {
        try {
            const { ok, payLoad, message } = await bookController.addBook(req.body);
            res.status(ok ? 201 : 500).json({ ok, payLoad, message });
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    });

    // api.get('/search', async (req, res) => {
    //     try {
    //         const { title, author, genre, year } = req.query;
    //         const { ok, payLoad, message } = await bookController.searchBooks({ title, author, genre, year });
    //         res.status(ok ? 200 : 500).json({ ok, payLoad, message });
    //     } catch (error) {
    //         res.status(500).json({ ok: false, message: error.message });
    //     }
    // });

    api.get('/', async (req, res) => {
        try {
            const { ok, payLoad, message } = await bookController.getBooks();
            res.status(ok ? 200 : 500).json({ ok, payLoad, message });
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    });


    api.put("/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const { ok, payLoad, message } = await bookController.updateBook(id, data);
            res.status(ok ? 200 : 500).json({ ok, payLoad, message });
        } catch (error) {

        }
    })


    return api;
};