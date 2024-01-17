const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory')
const AppError = require('../utils/AppError')
const UserCreateService = require('./UserCreateService')

describe('UserCreateService', () => {
  let userRepositoryInMemory = null
  let userCreateService = null

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userCreateService = new UserCreateService(userRepositoryInMemory)
  })

  it('user should be created', async () => {
    const user = {
      name: 'User Test',
      email: 'test@email.com',
      password: '123321'
    }

    const userCreated = await userCreateService.execute(user)

    expect(userCreated).toHaveProperty('id')
  })

  it('should not be able to create a new user with an email already registered', async () => {
    const user1 = {
      name: 'User Test One',
      email: 'test@email.com',
      password: '123321'
    }

    const user2 = {
      name: 'User Test Two',
      email: 'test@email.com',
      password: '321123'
    }

    await userCreateService.execute(user1)
    expect(async () => {
      await userCreateService.execute(user2)
    }).rejects.toEqual(new AppError('Email already registered'))
  })
})
