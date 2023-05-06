// Essential NPM packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logRoutes = require('./routes/posts')
const userRoutes = require('./routes/users')

//Import Schema
const Post = require('./models/post');


const app = express()

//Middleware


//Set CORS headers on response from this API use the 'cors' NPM package
app.use(cors({
    origin: 'http://172.17.28.19:3000'
}))
//Bodyparser
app.use(express.json())



app.use(logRoutes)
app.use(userRoutes)





//DB
const db = mongoose.connection
const dbConfig = require('./config/db')


const port = process.env.PORT|| 5000;

//Connect Mongoose

mongoose.connect(dbConfig)

db.on('error', (error) => console.log(`ERROR: ${error.message}`))
db.on('connected', () => console.log(`MongoDB Connected: ${dbConfig}`))
db.on('disconnected', () => console.log('MongoDB Disconnected'))





app.listen(port, () => console.log(`Server started on port ${port}`))

//Test

