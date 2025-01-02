// Example Borrowing Record Controller
const BorrowingRecord = require('../models/borowing.model');
const Book = require("../models/book.model")
class BorrowingRecordController {



    async borrowBook(data) {
        try {
            const { user, book, dueDate } = data;

            // Fetch the book document from the database using the book ID
            const bookToBook = await Book.findById(book);

            if (!bookToBook) {
                return { ok: false, message: "Book not found" };
            }

            if (bookToBook.copiesAvailable <= 0) {
                return { ok: false, message: "No copies available" };
            }

            // Create the borrowing record
            const borrowingRecord = new BorrowingRecord({
                user,
                book,
                dueDate,
            });
            const savedRecord = await borrowingRecord.save();

            // Update the book's available copies and borrowed count
            bookToBook.copiesAvailable -= 1;
            bookToBook.borrowedCount += 1;
            await bookToBook.save();

            return { ok: true, payLoad: savedRecord };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async returnBook(recordId) {
        try {
            

            const record = await BorrowingRecord.findById(recordId).populate('book');
            if (!record) {
                return { ok: false, message: "Borrowing record not found" };
            }

            if (record.returnedAt) {
                return { ok: false, message: "Book already returned" };
            }

            record.returnedAt = new Date();
            const daysOverdue = Math.ceil((record.returnedAt - record.dueDate) / (1000 * 60 * 60 * 24));
            if (daysOverdue > 0) {
                record.isOverdue = true;
                record.fineAmount = daysOverdue * 100; // Fine rate of 100 per day
            }
            await record.save();

            const book = record.book;
            book.copiesAvailable += 1;
            await book.save();

            return { ok: true, payLoad: record };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async getAll() {
        try {
            const records = await BorrowingRecord.find()
                .populate("user", "firstName lastName email") // Populate user fields
                .populate("book", "title author copiesAvailable"); // Populate book fields

            if (records.length === 0) {
                return { ok: false, message: "No borrowing records found" };
            }

            return { ok: true, payLoad: records };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }
    async getUserRecords(userId) {
        try {
          const records = await BorrowingRecord.find({ user: userId })
            .populate('book', 'title author') // Populate book title and author
            .populate('user', 'firstName lastName'); // Populate user firstName and lastName
          
          return { ok: true, payLoad: records };
        } catch (error) {
          return { ok: false, message: error.message };
        }
      }

    async payFine(data) {
        try {
            const { recordId, userId } = data;

            const record = await BorrowingRecord.findById(recordId);
            if (!record) {
                return { ok: false, message: "Borrowing record not found" };
            }

            if (!record.isOverdue) {
                return { ok: false, message: "No fine to pay for this record" };
            }
            if (record.finePaid) {
                return { ok: false, message: "Fine already paid" };
            }

            record.finePaid = true;
            await record.save();

            const user = await User.findById(userId);
            if (user) {
                user.totalFinesPaid += record.fineAmount;
                await user.save();
            }

            return { ok: true, payLoad: record };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

}

module.exports = new BorrowingRecordController();