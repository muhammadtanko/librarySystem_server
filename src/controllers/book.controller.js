// Example Book Controller
const Book = require('../models/book.model');

class BookController {
    async addBook(data) {
        try {
            const book = new Book(data);
            const savedBook = await book.save();
            return { ok: true, payLoad: savedBook };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async searchBooks(filters) {
        try {
            const query = {};
            if (filters.title) query.title = new RegExp(filters.title, 'i');
            if (filters.author) query.author = new RegExp(filters.author, 'i');
            if (filters.genre) query.genre = new RegExp(filters.genre, 'i');
            if (filters.year) query.publicationYear = filters.year;

            const books = await Book.find(query);
            return { ok: true, payLoad: books };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async getBooks() {
        try {
            const books = await Book.find();
            return { ok: true, payLoad: books };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async updateBook(id, data) {
        try {
            const updatedBook = await Book.findByIdAndUpdate(id, data, { new: true });
            return { ok: true, payLoad: updatedBook };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

}

module.exports = new BookController();