const mongoose = require('mongoose');

const Student = mongoose.model('Student', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tutor'
    }
}));

exports.Student = Student;
