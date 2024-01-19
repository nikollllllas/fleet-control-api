const AppError = require('../utils/AppError')
const { hash } = require('bcryptjs')

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ username, name, email, password }) {
    const checkUserExists = await this.userRepository.findByUsername(username)

    if (checkUserExists) {
      throw new AppError('Username already registered')
    }

    const hashedPassword = await hash(password, 8)

    try {
      const userCreated = await this.userRepository.create({
        username,
        name,
        email,
        password: hashedPassword
      })

      return userCreated
    } catch (e) {
      throw new Error('Failed to create user in the database')
    }
  }
}

module.exports = UserCreateService

