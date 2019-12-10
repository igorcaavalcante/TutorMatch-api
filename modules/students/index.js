const express = require('express');
const router = express.Router();
const { Student } = require('../../models/student');

router.post('/', async (req, res) => {
    if (!req.body.name) {
        res.status(400).send('Missing fields');
        return;
    }

    const student = new Student({
        name: req.body.name
    });

    await student.save().catch((error) => {
        res.status(400).send('Error: ' + error.message);
    });

    res.status(201).send({ student });
});

router.get('/', async (req, res) => {
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 10;

    const students = await Student.find().skip(skip).limit(limit).catch((error) => {
        res.status(400).send({ error: 'Error: ' + error.message });
    });

    res.status(200).send({ students });
});

router.get('/:id', async (req, res) => {
    const student = await Student.findOne(req.body.id).catch((error) => {
        res.status(400).send('Error: ' + error.message);
    });

    res.status(200).send({ student });
});

router.delete('/:id', (req, res) => { });

module.exports = router;
