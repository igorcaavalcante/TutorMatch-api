const express = require('express');
const router = express.Router();
const { Tutor } = require('../../models/tutor');

router.post('/', async (req, res) => {
    if (!req.body.name || !req.body.city) {
        res.status(400).send('Missing fields');
        return;
    }

    const tutor = new Tutor({
        name: req.body.name,
        city: req.body.city
    });

    await tutor.save().catch((error) => {
        res.status(400).send('Error: ' + error.message);
    });

    res.status(201).send({ tutor });
});

router.get('/', async (req, res) => {
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 10;

    const tutors = await Tutor.find().skip(skip).limit(limit).catch((error) => {
        res.status(400).send('Error: ' + error.message);
    });

    res.status(200).send({ tutors });
});

router.get('/:id', async (req, res) => {
    const tutor = await Tutor.findOne(req.body.id).catch((error) => {
        res.status(400).send('Error: ' + error.message);
    });
    res.status(200).send({ tutor });
});

router.delete('/:id', (req, res) => { });

module.exports = router;