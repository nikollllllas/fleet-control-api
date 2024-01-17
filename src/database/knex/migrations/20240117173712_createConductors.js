exports.up = (knex) =>
  knex.schema.createTable('conductors', (table) => {
    table.increments('id')
    table.text('name').notNullable()
    table.integer('birth_date').notNullable()
    table.text('mother_name').notNullable()
    table.text('nationality').notNullable()
    table.text('telephone').notNullable()
    table.text('rg').notNullable()
    table.text('cpf').notNullable()
    table.text('marital_status').notNullable()
    table.text('gender').notNullable()
    table.boolean('is_active').notNullable().default(true)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })

exports.down = (knex) =>
  knex.schema
    .dropTable('conductors')
    .then(() => console.log('Tabela de Condutores excluída'))

