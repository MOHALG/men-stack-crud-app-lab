
const router = require('express').Router();
const Car = require('../models/cars');

// Update car
router.put('/:id', async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedCar) return res.status(404).send('Car not found')
        // If the request is from a browser form, redirect
        if (req.headers.accept && req.headers.accept.includes('text/html')) {
            return res.redirect('/cars')
        }
        res.json(updatedCar)
    } catch (err) {
        if (req.headers.accept && req.headers.accept.includes('text/html')) {
            return res.status(400).send('Error updating car')
        }
        res.status(400).json({ message: err.message })
    }
})

// Edit car form
router.get('/:id/edit', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).send('Car not found');
        res.render('cars-edit', { car });
    } catch (err) {
        res.status(500).send('Error loading car for edit');
    }
});

// Create a new car
router.post('/', async (req, res) => {
    try {
        const newCar = new Car(req.body);
        const savedCar = await newCar.save();
        res.status(201).json(savedCar);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all cars
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update car
router.put('/:id', async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCar) return res.status(404).send('Car not found');
        if (req.headers.accept && req.headers.accept.includes('text/html')) {
            return res.redirect('/cars');
        }
        res.json(updatedCar);
    } catch (err) {
        if (req.headers.accept && req.headers.accept.includes('text/html')) {
            return res.status(400).send('Error updating car');
        }
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;


