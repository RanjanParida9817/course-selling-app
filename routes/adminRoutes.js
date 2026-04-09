const express = require('express');
const router = express.Router();

const validateHandler = require('../middlewares/validateHandler');
const {signinSchema,signupSchema} = require("../validators/authValidator");
const verifyToken = require('../middlewares/verifyToken');
const adminController = require('../controllers/adminController');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.post('/signup',validateHandler(signupSchema),adminController.signup);
router.post('/login',validateHandler(signinSchema),adminController.login);
router.post('/courses',verifyToken,verifyAdmin,adminController.addCourses);
router.put('/courses/:courseId',verifyToken,verifyAdmin,adminController.updateCourses);
router.get('/courses',verifyToken,verifyAdmin,adminController.getCourses);


module.exports = router;

