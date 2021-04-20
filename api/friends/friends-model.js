const db = require('../../data/dbConfig');

function getAll() {
    return db('friends')
}

function getById(id) {
    return db('friends')
    .where('id', id).first()
}

async function insert(friend) {
    const [id] = await db('friends')
    .insert(friend)
    return getById(id)
}

function remove(id) {
    return db('friends').where({id}).del();
}

module.exports = {
    remove,
    insert,
    getById,
    getAll,
}