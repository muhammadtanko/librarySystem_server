const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    category: { type: String },
    publicationYear: { type: Number },
    copiesAvailable: { type: Number, default: 1 }, // Tracks available copies
    totalCopies: { type: Number, default: 1 }, // Total copies of the book
    borrowedCount: { type: Number, default: 0 } // Total times the book has been borrowed
});

module.exports = mongoose.model('Book', BookSchema);
