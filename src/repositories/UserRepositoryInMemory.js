class UserRepositoryInMemory {
  users = []

  async create({ username, name, email, password }) {
    const user = {
      id: Math.random().toString(16).slice(2),
      username, 
      name,
      email,
      password
    }

    this.users.push(user)

    return user
  }

  async findByUsername(username) {
    return this.users.find((user) => user.username === username)
  }
}

module.exports = UserRepositoryInMemory
