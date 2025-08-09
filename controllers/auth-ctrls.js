
const User = require('../model/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUpUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        
        if(username.length < 3) {
            return res.status(400).json({
                success : false,
                prompt : `Username is too short.`
            });
        } else if(password.length < 6) {
            return res.status(400).json({
                success : false,
                prompt : `Password is too short.`
            });
        }

        const checkUserExist = await User.findOne({username});

        if(checkUserExist) {
            return res.status(400).json({
                success : false,
                prompt : `Username is already.`
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            password : hashPassword
        });

        if(!newUser) {
            return res.status(400).json({
                success : false,
                prompt : `Unable to sign up, please try again.`
            });
        };
        
        const createToken = await jwt.sign({
            userId : newUser._id,
            username : newUser.username,
            password : newUser.password,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn : `30d`
        })

        res.status(200).json({
            success : true,
            prompt : `Account created successfully.`,
            user : newUser,
            token : createToken
        });

    } catch (error) {
        res.status(500).json({
            success : false,
            prompt : `Something went wrong, please try again.`,
            error : error
        })
    }
}

const signInUser = async (req, res) => {
    try {
        const {username, password} = req.body;

        const checkUserExist = await User.findOne({username});

        if(!checkUserExist) {
            return res.status(400).json({
                success : false,
                prompt : `Invalid user, please sign up.`
            });
        }

        const checkPassword = await bcrypt.compare(password, checkUserExist.password);
        
        if(!checkPassword) {
            return res.status(400).json({
                success : false,
                prompt : `Wrong password. `
            });
        }

        const createToken = await jwt.sign({
            userId : checkUserExist._id,
            username : checkUserExist.username,
            password : checkUserExist.password
        }, process.env.JWT_SECRET_KEY, {
            expiresIn : '30d'
        });
        
        res.status(200).json({
            success : true,
            prompt : `Logged in successfully.`,
            userId : checkUserExist._id,
            username : checkUserExist.username,
            token : createToken
        });

    } catch (error) {
        res.status(500).json({
            success : false,
            prompt : `Something went wrong, please try again.`,
            error : error
        })
    }
}


module.exports = {signUpUser, signInUser};