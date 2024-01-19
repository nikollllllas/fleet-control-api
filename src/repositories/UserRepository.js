const knex = require('knex')
const sqliteConnection = require('../database/sqlite')

class UserRepository {
  async findByUsername(username) {
    const database = await sqliteConnection()

    const user = await database.get(
      `
      SELECT * FROM users
      WHERE username = (?)
    `,
      [username]
    )

    return user
  }

  async create({ username, name, email, password }) {
    const database = await sqliteConnection()

    try {
      const result = await database.run(
        'INSERT INTO users (username, name, email, password) VALUES (?, ?, ?, ?)',
        [username, name, email, password]
      )

      const createdUser = { id: result.lastID }
      return createdUser
    } catch (error) {
      throw new Error('Failed to create user in the database')
    } finally {
      await database.close()
    }
  }

  async update({ id, username, name, email, password }) {
    await knex('users')
      .where('id', id)
      .update({ username, name, email, password, updated_at: knex.fn.now() })
  }
}

module.exports = UserRepository

