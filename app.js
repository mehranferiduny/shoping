const express=require('express');
require('dotenv').config();

const PORT=process.env.PORT||7000;

const app=express();

///!middelwer
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));




app.listen(PORT,()=> console.log(`start port : ${PORT}`))