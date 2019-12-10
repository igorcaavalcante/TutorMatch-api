const mongoose = require('mongoose');

const Tutor = mongoose.model('Tutor', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    students: []
}));

exports.Tutor = Tutor;
