// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")
const morgan = require('morgan')
const carsRouter = require('./controllers/cars.routes')

// Middleware
app.set('view engine', 'ejs')
app.use(express.static('public')) // my app will serve all static files from public folder
app.use(express.urlencoded({ extended: false })); // Must be before routes
app.use(morgan('dev'))

app.use('/cars', carsRouter) // all routes in carsRouter will be prefixed with /cars












async function connectToDB(){ //connection to the database
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occured",error)
    }
}


connectToDB() // connect to database














// Routes go here










app.listen(3000,()=>{
    console.log('App is working')
}) // Listen on Port 3000


