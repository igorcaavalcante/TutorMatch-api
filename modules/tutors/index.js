const express = require('express');
const router = express.Router();
const { Tutor } = require('../../models/tutor');
const { Student } = require('../../models/student');

router.post('/', async (req, res) => {
    if (!req.body.name || !req.body.city) {
        res.status(400).send({ error: 'Missing fields' });
        return;
    }

    const tutor = new Tutor({
        name: req.body.name,
        city: req.body.city
    });

    await tutor.save().catch((error) => {
        res.status(400).send({ error: error.message });
    });

    res.status(201).send({ tutor });
});

router.post('/:tutorId/new_student', async (req, res) => {
    if (!req.body.studentId) {
        res.status(400).send({ error: 'Missing fields' });
        return;
    }

    const student = await Student.findOne({ _id: req.body.studentId }).catch((error) => {
        res.status(400).send({ error: error.message });
    });

    const tutor = await Tutor.findOne({ _id: req.params.tutorId }).catch((error) => {
        res.status(400).send({ error: error.message });
    });

    if (!student || !tutor) {
        res.status(404).send({ error: 'Student or tutor not found' });
        return;
    }

    tutor.students.push(student);

    await tutor.save().catch((error) => {
        res.status(400).send({ error: error.message });
    });

    res.status(200).send({ tutor });
});

router.get('/', async (req, res) => {
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 10;

    const tutors = await Tutor.find().skip(skip).limit(limit).catch((error) => {
        res.status(400).send({ error: error.message });
    });

    res.status(200).send({ tutors });
});

router.get('/:id', async (req, res) => {
    const tutor = await Tutor.findOne({ _id: req.params.id }).catch((error) => {
        res.status(400).send({ error: error.message });
    });

    if (!tutor) {
        res.status(404).send({ error: 'Tutor not found' });
        return;
    }

    res.status(200).send({ tutor });
});

router.delete('/:id', (req, res) => { });

module.exports = router;
