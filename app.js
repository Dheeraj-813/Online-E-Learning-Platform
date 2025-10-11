// Importing express module...

const express = require('express');

// Importing mongoose module...

const mongoose = require('mongoose');

// Importing Routes...

const categories = require('./Routes/categories');
const students = require('./Routes/students');

// Importing Middlewares...

const app = express();
app.use(express.json());

// connecting to the database...

mongoose.connect('mongodb://127.0.0.1/Online_ELearning_Platform')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Using Routes... '/api/categories' and '/api/students' is the endpoint... after which we can access the routes...
app.use('/api/categories', categories);
app.use('/api/students', students);


// Listening to the server...(port no. assigned)
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));