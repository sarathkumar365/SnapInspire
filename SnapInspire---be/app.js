const express = require('express');
const app = express();
const path =require('path')
const cors  = require('cors')
const cookieParser = require('cookie-parser');
const {upload,storage} = require('./configs/multerConfigs')
const globalErrorController = require('./controllers/errorController')
const AppError = require('./utils/AppError')

// routes 
const authRoute = require('./routes/authRoute')
const postsRoute = require('./routes/postsRoutes')
const UsersRoute = require('./routes/userRoutes')

// SCHEMAS
const Posts = require('./models/postsSchema')

//test
app.use((req, res, next) => {
    console.log('Auth Header Test');
    
    console.log(req.headers['authorization']);  // Should log 'Bearer <token>'
    next();
});




app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));

// cookie parser
app.use(cookieParser());
  
 // set STATIC folders
//  console.log(path.join(__dirname, 'public'))
// app.use(express.static(path.join(__dirname, 'public')))

// to make it available like : http://localhost:port/images, then do the folllowing
 app.use('/images',express.static(path.join(__dirname, 'public/images')))

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

// ROUTES
app.use('/ping',(req, res, next) =>{
    res.status(200).send('ping')
})
app.use('/auth',authRoute)
app.use('/posts',upload.single('post'), postsRoute)
app.use('/users',UsersRoute)

// UNDEFINED ROUTES
app.all('*',(req, res,next) => {
    const err = AppError(404,'oops, no such route found 🔴', null)
    next(err)
})

// Error Controller
app.use(globalErrorController)


module.exports = app;