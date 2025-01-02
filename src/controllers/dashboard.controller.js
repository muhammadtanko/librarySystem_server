// Import necessary modules
const User = require("../models/user.model");
const Book = require("../models/book.model");
const BorrowingRecord = require("../models/borowing.model");

class DashBoardController {
    async getDashboardData() {
        try {
            // Fetch total users
            const totalUsers = await User.countDocuments();

            // Fetch total books
            const totalBooks = await Book.countDocuments();

            // Fetch borrowed books count
            const borrowedBooks = await BorrowingRecord.countDocuments({ returnedAt: null });

            // Fetch overdue books count
            const overdueBooks = await BorrowingRecord.countDocuments({ isOverdue: true });

            // Fetch popular books
            const popularBooks = await Book.find()
                .sort({ borrowedCount: -1 })
                .limit(5)
                .select("title author borrowedCount");

            // Send response
            return {
                ok: true, payLoad: {
                    totalUsers,
                    totalBooks,
                    borrowedBooks,
                    overdueBooks,
                    popularBooks,
                }
            };




        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            res.status(500).json({ message: "Failed to fetch dashboard data." });
        }
    };

}

module.exports = new DashBoardController();