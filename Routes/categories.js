// Mangaging all the categories related routes.
// To use this as routes, we need to export this file as a express module...

const express = require('express');

// Creating router...
const router = express.Router();

// Importing Category model and validate function...
const {Category, validate} = require('../models/categoriesModel');
    
// Http Methods.....(get, post, put, delete)

router.get('/', async (req, res) => {
    let categories = await Category.find()
    res.send(categories);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const category = new Category({
        name: req.body.name
    });
    await category.save();
    res.send(category);
})

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const category = await Category.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true})
    if (!category) return res.status(404).send('Category not found');
    res.send(category);
})

router.delete('/:id', async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id)
    if (!category) return res.status(404).send('Category not found');
    res.send(category);
})

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id)
    if (!category) return res.status(404).send('Category not found');
    res.send(category);
})


module.exports = router;