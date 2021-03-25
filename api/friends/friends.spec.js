const Friends = require('./friends-model');
const db = require('../../data/dbConfig');
const supertest = require('supertest');
const server = require('../server');


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

describe('Friends model', () => {
    it('works', () => {
        expect(true).toBe(true)
    })

    describe('getAll', () => {
        let friends
        beforeEach(async () => {
            friends = await Friends.getAll()
        })
        it('can retrieve all friends', async () => {
            expect(friends).toHaveLength(6)
        })
        it('can retrieve friends with {id,name}', async ()=> {
            expect(friends[0]).toMatchObject({ id: 1, name: 'monica'})
        })
    })

    describe('getById', () => {
        it('can get friend object {id, name} by its id', async () => {
            const monica = await Friends.getById(1)
            expect(monica).toMatchObject({ id: 1, name: 'monica'})
        })
    })

    describe('insert', () => {
        it('can insert a friend into the db', async () => {
            const mike = { name: 'mike'}
            await Friends.insert(mike)
            expect(await db('friends')).toHaveLength(7)
            const mike2 = await db('friends')
            .where({ id: 7 }).first()
            expect(mike2).toMatchObject({ id: 7, name: 'mike'})
        })
    })

    describe('remove', () => {
        it('can delete a friend', async () => {
            const res = await supertest(server).delete('/1')
            expect(res.statusCode).toBe(404)
        })
    })
})