// Mangaging all the students related routes.
// To use this as routes, we need to export this file as a express module...

const express = require('express');

// Importing Student model and validate function...
const {Student, validate} = require('../models/studentsModel');

// Creating router...
const router = express.Router();

    
// Http Methods.....(get, post, put, delete)

router.get('/', async (req, res) => {
    let students = await Category.find()
    res.send(students);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const students = new Student({
        name: req.body.name,
        isEnrolled: req.body.isEnrolled,
        phone: req.body.phone
    });
    await students.save();
    res.send(students);
})

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const students = await Student.findByIdAndUpdate(req.params.id, {name: req.body.name, isEnrolled: req.body.isEnrolled, phone: req.body.phone}, {new: true})
    if (!students) return res.status(404).send('Category not found');
    res.send(students);
})

router.delete('/:id', async (req, res) => {
    const students = await Student.findByIdAndDelete(req.params.id)
    if (!students) return res.status(404).send('Category not found');
    res.send(students);
})

router.get('/:id', async (req, res) => {
    const students = await Student.findById(req.params.id)
    if (!students) return res.status(404).send('Category not found');
    res.send(students);
})

module.exports = router;