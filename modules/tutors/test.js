const request = require('supertest');
const { Tutor } = require('../../models/tutor');

describe('tutors', () => {
    let server;

    let name = 'Mr Miyagi';
    let city = 'Tokyo';

    beforeEach(async () => {
        server = require('../../index');
    });

    afterEach(async () => {
        await Tutor.deleteOne({});
        await server.close();
    });

    it('shoud not create a tutor - name not provided', async () => {
        const res = await request(server).post('/api/tutors').send({});
        expect(res.status).toBe(400);
    });

    it('shoud not create a tutor - city not provided', async () => {
        const res = await request(server).post('/api/tutors').send({ name });
        expect(res.status).toBe(400);
    });

    it('shoud create a tutor - everything ok', async () => {
        const res = await request(server).post('/api/tutors').send({ name, city });
        expect(res.status).toBe(201);
    });
});
