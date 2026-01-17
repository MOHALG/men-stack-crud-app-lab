
const router = require('express').Router();
const Car = require('../models/cars');




// Get all cars
router.get('/', async (req,res) => {
    const cars = await Car.find();
    res.render('cars-list', { cars });
});

// Render create form (must be before /:id route)
router.get('/new', async (req,res) => {
    res.render('cars-create');
});

router.get('/:id', async (req,res) => {
    const car = await Car.findById(req.params.id);
    res.render('car-details', { car });
});

// Create a new car
router.post('/', async (req,res) => {
    const car = await Car.create(req.body);
    res.redirect(`/cars/${car._id}`);
});

// Get a single car by ID
router.get('/:id/edit', async (req,res) => {
    const car = await Car.findById(req.params.id);
    res.render('cars-edit', { car });
});

// update a car by ID
router.post('/:id', async (req,res) => {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/cars/${req.params.id}`);
});
// delete a car by ID
router.get('/:id/delete', async (req,res) => {
    const deltedCar = await Car.findByIdAndDelete(req.params.id);
    res.redirect('/cars');
});


// ...existing code...

// ...existing code...






module.exports = router;


