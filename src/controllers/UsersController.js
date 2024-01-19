const AppError = require('../utils/AppError')
const { hash, compare } = require('bcryptjs')

const knex = require('../database/knex')
const UserRepository = require('../repositories/UserRepository')
const UserCreateService = require('../services/UserCreateService')

class UsersControllers {
  async create(req, res) {
    const { username, name, email, password } = req.body

    const userRepository = new UserRepository()
    const userCreateService = new UserCreateService(userRepository)

    await userCreateService.execute({ username, name, email, password })

    return res.status(201).json()
  }

  async update(req, res) {
    const { username, name, email, password, old_password } = req.body
    const user_id = req.user.id

    const user = await knex('users').where('id', user_id).first()

    if (!user) {
      throw new AppError('User not found. :(')
    }

    const userWithUpdatedUsername = await knex('users')
      .where('username', username)
      .first()

    if (userWithUpdatedUsername && userWithUpdatedUsername.id !== user.id) {
      throw new AppError('Username already registered.')
    }

    const updatedFields = {
      name: name || user.name,
      email: email || user.email,
      updated_at: knex.fn.now()
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.')
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)
      if (!checkOldPassword) {
        throw new AppError('Old password does not match.')
      }

      user.password = await hash(password, 8)
    }

    await knex('users').where('id', user_id).update(updatedFields)

    return res.json(updatedFields)
  }
}

module.exports = UsersControllers

