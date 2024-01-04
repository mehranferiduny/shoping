const express=require('express');
const connectDB=require('./config/connDB')
const fileUpload = require("express-fileupload");
const expressLayout = require("express-ejs-layouts");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo')(session);
const {Server}=require('socket.io');
const http=require('http');

const basketcontroll=  require("./controller/bascket");




//!Config
require('dotenv').config({path:'./config/config.env'});
connectDB()

//! Passport Configuration
require("./config/pasport");

const PORT=process.env.PORT||7000;

const app=express();

//!server
const server=http.createServer(app);
const io= new Server(server);


//! Session
app.use(
  session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      unset: "destroy",
      store: new MongoStore({ mongooseConnection: mongoose.connection,collection: 'session' })
    
  })
);

///!middelwer
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



//! View Engine
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("layout", "./layouts/mainLayout");
app.set("views", "views");

//! Flash
app.use(flash()); //req.flash

//! Passport
app.use(passport.initialize());
app.use(passport.session());

//! File Upload Middleware
app.use(fileUpload());

//!router
app.use(require('./router/index'))
app.use('/dashbord',require('./router/dashbord'))
app.use('/user',require('./router/users'))




server.listen(PORT,()=> console.log(`start port : ${PORT}`))



io.on("connection",(socket)=>{
 
  socket.on("add_bsk",(data)=>{
        basketcontroll.addProToShop(data)
  })
})