const db = require('../data/dbConfig')

async function add(user) {
	const [id] = await db("users").insert(user)
	return findById(id)
}

function find() {
	return db("users").select("id", "username", "password", "name")
}

function findBy(filter) {
	return db("users")
		.select("id", "username", "password", "name")
		.where(filter)
}

function findById(id) {
	return db("users")
		.select("id", "username", "name")
		.where({ id })
		.first()
}

module.exports = {
	add,
	find,
	findBy,
	findById,
}