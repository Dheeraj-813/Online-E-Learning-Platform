// Importing Mongoose module for database...
const mongoose = require('mongoose');

// Importing Joi module for validation...
const joi = require('joi');

// Creating a category schema.....
const categorySchema = new mongoose.Schema({
    name: {type : String, required : true, minlength : 3, maxlength : 50}
});

// Creating a category model.....
const Category = mongoose.model('Category', categorySchema);


// Validating the category...

function validateCategory(category) {
    const schema = joi.object({
      name: joi.string().min(3).required()
    });
    return schema.validate(category);
}

// Exporting the category model and validate function...
exports.Category = Category;
exports.validate = validateCategory;
// -----------------------------------------------------------------------------------------------------


// Important.......


// If want to create new model for courses then we need pass the categoryschema as a reference in the couresSchema under category field.
// For example:-

// const {categorySchema} = require('../models/categoriesModel');

// const Course = mongoose.model('Course', new mongoose.Schema({
//     category : {
//         type : categorySchema,
//         required : true
//     },
// })
// );

// In post method of courses route we need to check whether the category id passed is valid or not....

// const {Course, validate} = require('../models/coursesModel');

// const {Category} = require('../models/categoriesModel');

// router.post('/:id', async (req, res) => {
//     const {error} = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);
//     const category = Category.findById(req.body.categoryId);
//     if (!category) return res.status(400).send('Invalid category.');
//     let course = new Course({
//         title: req.body.title,
//         category: {
//             _id: category._id,
//             name: category.name
//         },
//         creator: req.body.creator,
//         rating: req.body.rating,
//     })
//     course = await Course.save();
//     res.send(course);
// })

// In Put method of courses route we need to check whether the category id passed is valid or not....

// router.put('/:id', async (req, res) => {
//     const {error} = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);
//     const category = Category.findById(req.body.categoryId);
//     if (!category) return res.status(400).send('Invalid category.');
//     const course = await Course.findByIdAndUpdate(req.params.id, {
//         title: req.body.title,
//         category: {
//             _id: category._id,
//             name: category.name
//         },
//         creator: req.body.creator,
//         rating: req.body.rating,
//     }, {new: true})
// })
//     if (!course) return res.status(404).send('Course not found');
//     res.send(course);