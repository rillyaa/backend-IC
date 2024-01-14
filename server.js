const mysql = require('mysql');
const express = require('express')
const app = express()
const port = 5000
const userRouter = require('./api_src/users/users.router')
const ideaRouter = require('./api_src/ideas/idea.router')

require('dotenv').config()
// const db = require('./config/database')

app.use(express.json());
// app.use(bodyParser.json());
app.use('/', userRouter);
app.use('/', ideaRouter);

app.get('/' , (req , res)=>{

    res.send('hello from simple server :)');
 
 });
 
app.listen(port , ()=> {
    console.log('> Server is up and running on port : ' + port);
})