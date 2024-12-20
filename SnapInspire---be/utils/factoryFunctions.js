
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const AppError  = require('./AppError')
const catchAsyncErrors = require('./catchAsyncErrors')
const User = require('../models/userSchema')

// generic response method
exports.sendResponse = (res,status,statusCode,data = null) => {
    if(status === 'success')    return res.status(statusCode).json({msg:'Success',data})
    if(status === 'fail')    return res.status(statusCode).json({msg:'Success',data})    
}


// refresh token save in DB

const saveRefreshToken = async (refreshTokens,userId) => {

    const [tokensArr,tokensArrErr] = 
        await catchAsyncErrors(User.updateOne({_id:userId},{ $push : {refreshTokens : refreshTokens }}))
    
        if(tokensArrErr) next(AppErr(500,'refreshtoken error',tokensArrErr))

    return tokensArr
}

exports.checkPassValid = async (incomingPassword,savedPassword) => {

    const match = await bcrypt.compare(incomingPassword,savedPassword);
    if(match) {
        //login
        return true
    } 

    return false;
}

// // Function to create and send jwt token
exports.createSendToken =  async (userId) => {

    const token =  jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN,
        })

    if(!token) return next(AppError(500,'Token generation failed, please contact the administrator',null))

    // GENERATE REFRESH TOKEN
    const refreshToken =  jwt.sign({userId},process.env.JWT_SECRET_REFRESH)

    if(!refreshToken) return next(AppError(500,'refreshToken generation failed, please contact the administrator',null))

    // save refreshToken in DB
    const saved = await saveRefreshToken(refreshToken,userId)

    return [token,refreshToken]
}

exports.verifyToken = async (req, res, next) => {
    // console.log(req.headers.Authorization);
    // 1) Get token and check if it exists
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))     
    token = req.headers.authorization.split(' ')[1]

    if (!token) return next(AppError(401, 'You are not logged in! Please log in to get access.', null))
    
    // 2) Verify token
    let decoded
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decoded);
    try {
        decoded = jwt.verify(token,process.env.JWT_SECRET);
      } catch(err) {
        // err
        if(err) return next(AppError(401,'JWT verification failed',err))
      }
    
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.userId).select('-password').select('-refreshTokens')
    
    if (!currentUser)     
            return next(AppError(401,'The user belonging to this token does no longer exist.',null))

    // if everything OK, put token in req
    req.currentUser = currentUser
    console.log(`Token verified, CURRENT USER: ${currentUser.name}`);
    next()
}


// route to get userdetails
exports.getUserDetails = async (req,res) => {
    console.log('user details 1️⃣');
    
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))     
    token = req.headers.authorization.split(' ')[1]

    const userDetails = jwt.verify(token,process.env.JWT_SECRET);
    const currentUser = await User.findById(userDetails.userId).select('-password').select('-refreshTokens')    

    return res.status(200).json({
        name:currentUser.name,
        email:currentUser.email

    })
}