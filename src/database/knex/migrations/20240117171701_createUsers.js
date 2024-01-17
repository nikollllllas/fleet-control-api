exports.up = knex => knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('email').unique().notNullable()
    table.string('password').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
  .then(() => console.log('Tabela de Usuários criada'))

exports.down = knex => knex.schema
  .dropTable('users')
  .then(() => console.log('Tabela de Usuários excluída'))

