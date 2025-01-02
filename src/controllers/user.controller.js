// Example User Controller
const User = require('../models/user.model');

class UserController {
    async registerUser(data) {
        try {
            const user = new User(data);
            const savedUser = await user.save();
            return { ok: true, payLoad: savedUser };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async getUserById(id) {
        try {
            const user = await User.findById(id);
            if (!user) return { ok: false, message: 'User not found' };
            return { ok: true, payLoad: user };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async updateUser(id, data) {
        try {
            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
            return { ok: true, payLoad: updatedUser };

        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async getUsers() {
        try {
            const user = await User.find();
            return { ok: true, payLoad: user };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async loginUser({ email, password }) {
        try {
            let user = await User.findOne({ email: email })
            if (user) {
                const isValid = await user.isValidPassword(password)
                if (isValid) {
                    user = user.toJSON(user);
                    user.password = "******";
                    return { ok: true, payLoad: { data: user, customMessage: "Logged in successfully" } };
                } else {
                    return { ok: false, message: "Password incorrect, Please try again" };
                }
            } else {
                return { ok: false, message: "User not found" };
            }
        } catch (error) {
            return { ok: false, message: error.message };

        }
    }
}

module.exports = new UserController();