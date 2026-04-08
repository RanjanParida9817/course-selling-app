const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');
const validateHandler = require('../middlewares/validateHandler');
const { signupSchema, signinSchema } = require('../validators/authValidator');

router.post('/signup', validateHandler(signupSchema), userController.signup);
router.post('/login', validateHandler(signinSchema), userController.login);
router.get('/courses', verifyToken, userController.getCourses);
router.post('/courses/:courseId', verifyToken, userController.buyCourses);
router.get('/purchasedCourses', verifyToken, userController.purchasedCourses);

module.exports = router;