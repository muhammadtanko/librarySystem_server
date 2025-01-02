const mongoose = require("mongoose");
const { Schema } = mongoose;

const BorrowingRecordSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    borrowedAt: { type: Date, default: Date.now },
    dueDate: { type: Date },
    returnedAt: { type: Date },
    isOverdue: { type: Boolean, default: false },
    fineAmount: { type: Number, default: 0 }, // Stores fine for late return
    finePaid: { type: Boolean, default: false } // Tracks if the fine has been paid
});

module.exports = mongoose.model('BorrowingRecord', BorrowingRecordSchema);
