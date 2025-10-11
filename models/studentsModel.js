// Importing Mongoose module for database...
const mongoose = require('mongoose');

// Importing Joi module for validation...
const joi = require('joi');

// Creating a students schema.....
const studentsSchema = new mongoose.Schema({
    name: {type : String, required : true, minlength : 3, maxlength : 50},

    isEnrolled: {type : Boolean, default : false},

    phone: {type : String, required : true, minlength : 10, maxlength : 10}
});

// Creating a student model.....
const Student = mongoose.model('Student', studentsSchema);

// Validating the student...

function validateCategory(students) {
    const schema = joi.object({
      name: joi.string().min(3).required(),
        isEnrolled: joi.boolean(),
        phone: joi.string().min(10).max(10).required()
    });
    return schema.validate(students);
}

// Exporting the student model and validate function...

exports.Student = Student;
exports.validate = validateCategory;