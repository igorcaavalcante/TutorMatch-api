const express = require('express');
const router = express.Router();
const { Student } = require('../../models/student');

router.post('/', async (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ error: 'Missing fields' });
        return;
    }

    const student = new Student({
        name: req.body.name
    });

    await student.save().catch((error) => {
        res.status(400).send({ error: error.message });
    });

    res.status(201).send({ student });
});

router.get('/', async (req, res) => {
    const skip = req.params.skip || 0;
    const limit = req.params.limit || 10;

    const students = await Student.find().skip(skip).limit(limit).catch((error) => {
        res.status(400).send({ error: error.message });
    });

    const count = await Student.countDocuments();

    const result = {
        data: students,
        meta: {
            totalRecords: count
        }
    };

    res.status(200).send(result);
});

router.get('/:id', async (req, res) => {
    const student = await Student.findOne({ _id: req.params.id }).catch((error) => {
        res.status(400).send({ error: error.message });
    });

    if (!student) {
        res.status(404).send({ error: 'Student not found' });
        return;
    }

    res.status(200).send({ student });
});

router.delete('/:id', (req, res) => { });

module.exports = router;
