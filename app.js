const express=require('express');
const connectDB=require('./config/connDB')
const fileUpload = require("express-fileupload");




//!Config
require('dotenv').config({path:'./config/config.env'});
connectDB()


const PORT=process.env.PORT||7000;

const app=express();

///!middelwer
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//! File Upload Middleware
app.use(fileUpload());

//!router
app.use('/dashbord',require('./router/dashbord'))




app.listen(PORT,()=> console.log(`start port : ${PORT}`))