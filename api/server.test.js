const server = require('./server');
const request = require('supertest');
const db = require('../data/dbConfig');

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db('friends').truncate()
    await db.seed.run()
})
afterAll(async () => {
    await db.destroy()
})

it('process.env.DB_ENV must be "testing"', () => {
    expect(process.env.DB_ENV).toBe('testing')
})

describe('friends endpoints', () => {
    describe('[GET] /friends', async () => {
        it('returns all friends', async () => {
            const res = await request(server).get('/friends')
            expect(res.body).toHaveLength(6)
        })
        
        it('returns with 200 status of OK', async () => {
            const res = await request(server).get('/friends')
            expect(res.status).toBe(200)
        })
    })

    describe('[POST] /friends', () => {
        it('responds with a new friend', async () => {
            const res = await request(server)
            .post('/friends')
            .send({ name: 'mike' })
            expect(res.body).toMatchObject({ id: 7, name: 'mike'})
        })
    })
})