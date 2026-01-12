// Serve the car creation form

require('dotenv').config() // Load environment variables from .env file
const express = require('express') // import the express package


const app = express() // creates an instance of express Server  
app.use(express.urlencoded({ extended: true })) // to parse form submissions
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const mongoose = require('mongoose') // import mongoose package
const Car = require('./models/cars') // import the Car model
const carsRouter = require('./controllers/cars.routes')
app.use(express.json()) // to parse JSON bodies

// Custom POST /cars handler for browser form submissions
app.post('/cars', async (req, res, next) => {
    try {
        const newCar = new Car(req.body)
        await newCar.save()
        return res.redirect('/cars')
    } catch (err) {
        return res.status(400).send('Error creating car')
    }
})

// Custom GET /cars handler to render HTML list
app.get('/cars', async (req, res) => {
    try {
        const cars = await Car.find()
        res.render('cars-list', { cars })
    } catch (err) {
        res.status(500).send('Error loading cars')
    }
})

app.use('/cars', carsRouter)


async function conntentToDB(){
    try{
        // /database_name?
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connection Successful')
    }
    catch(err){
        console.log('Error in Connection')
    }
}
conntentToDB()





// Basic test route
// app.get('/test', (req, res) => {
//     res.send('Server is running!');
// });

app.get('/cars-create', (req, res) => {
    res.sendFile(__dirname + '/public/cars-create.html');
});





app.listen(3000,()=>{
    console.log('App is working')
}) // Listen on Port 3000

// const mongoose = require('mongoose') // import mongoose package