const Admin = require('../models/adminModel');
const Course = require('../models/courseModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async(req,res,next) => {
    try{
        const {username,password} = req.body;

        const existingAdmin = await Admin.findOne({username});
        if(existingAdmin){
            return res.status(400).json({
                message:"Admin already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newAdmin = await Admin.create({
            username:username,
            password:hashedPassword
        });

        res.status(201).json({
            message:"Admin created successfully"
        });

    } catch(error){
        next(error);
    }
}

const login = async(req,res,next) => {
    try{
        const {username,password} = req.body;

        const existingAdmin = await Admin.findOne({username});
        if(!existingAdmin){
            return res.status(404).json({
                message:"Admin not found"
            });
        }

        const isMatch = await bcrypt.compare(password,existingUser.password);
        if(!isMatch){
            return res.status(401).json({
                message:"Invalid credentials"
            });
        }

        const token = jwt.sign(
            {id:existingAdmin._id,username:existingAdmin.username},
            process.env.SECRET_KEY,
            {expiresIn:'1h'}
        );

        res.status(200).json({
            message:"Logged in successfully",
            token:token
        });


    } catch(error){
        next(error);
    }
}


const addCourses = async(req,res,next) => {
    try{
        const {title,description,price,imageLink,published} = req.body;

        const newCourse = await Course.create({
            title:title,
            description:description,
            price:price,
            imageLink:imageLink,
            published: published
        });

        res.status(201).json({
            message:"Course created successfully",
            courseId: newCourse._id
        });

    } catch(error){
        next(error);
    }
}

const updateCourses = async(req,res,next) => {
    try{
        const {title,description,price,imageLink,published} = req.body;

        const findCourse = await Course.findOneAndUpdate(
            {_id:req.params.courseId},
            {
                title:title,
                description: description,
                price: price,
                imageLink: imageLink,
                published: published
            },

            {new:true}
        );

        if(!findCourse){
            return res.status(404).json({
                message:"No course found"
            });
        }

        res.status(200).json({
            message:"Course updated successfully"
        });

    } catch(error){
        next(error);
    }
}

const getCourses = async(req,res,next) => {
    try{
        const allCourses = await Course.find();
        res.status(200).json({
            courses:allCourses
        });


    } catch(error){
        next(error);
    }
}


module.exports = {signup,login,addCourses,updateCourses,getCourses};