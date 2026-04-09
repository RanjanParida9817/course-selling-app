const User = require('../models/userModel');
const Course = require('../models/courseModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username: username,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User signed up"
        });

    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: existingUser._id, username: existingUser.username, role:"user"},
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Login successfull",
            token: token
        });
    } catch (error) {
        next(error);
    }
}

const getCourses = async (req, res, next) => {
    try {
        const allCourses = await Course.find({ published: true });
        res.status(200).json({
            courses: allCourses
        });

    } catch (error) {
        next(error);
    }
}

const buyCourses = async (req, res, next) => {
    try {
        const courseId = req.params.courseId;

        const courses = await Course.findOne({ _id: courseId });
        if (!courses) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const findUser = await User.findOneAndUpdate(
            { _id: req.user.id },
            {
                $addToSet: { purchasedCourses: courses._id }
            },

            { new: true }
        );

        if (!findUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Course purchased successfully"
        });


    } catch (error) {
        next(error);
    }
}

const purchasedCourses = async (req, res, next) => {
    try {
        const allPurchasedCourses = await User.findById(req.user.id).populate('purchasedCourses');

        res.status(200).json({
            purchasedCourses: allPurchasedCourses.purchasedCourses
        });
    } catch (error) {
        next(error);
    }
}


module.exports = { signup, login, getCourses, purchasedCourses, buyCourses }