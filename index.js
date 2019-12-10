const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/TutorMatch')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());

const tutorsRouter = require('./modules/tutors/index');
const studentsRouter = require('./modules/students/index');

app.use('/api/tutors', tutorsRouter);
app.use('/api/students', studentsRouter);

const PORT = process.env.PORT || 3000;
const server = app.listen(3000, () => console.log(`Listening on port ${PORT}`));

module.exports = server;