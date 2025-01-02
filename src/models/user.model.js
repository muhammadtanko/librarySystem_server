const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    ID: { type: String, unique: true, },
    email: { type: String, unique: true },
    password: { type: String },
    phone: { type: String },
    userType: { type: String, enum: ['Student', 'Admin'], default: "Student" },
    gender: { type: String, enum: ['Male', 'Female'] },
    status: { type: String, enum: ["Active", "Disabled"], default: "Active" },
    totalFinesPaid: { type: Number, default: 0 },
    borrowingRecord: [{ type: mongoose.Types.ObjectId, ref: 'BorrowingRecord' }]

}, { timestamps: true });

UserSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
