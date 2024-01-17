exports.up = (knex) =>
  knex.schema.createTable('vehicles', (table) => {
    table.increments('id')
    table.text('license_plate').notNullable().unique()
    table.text('vehicle_type').notNullable()
    table.text('model').notNullable()
    table.text('manufacturer').notNullable()
    table.integer('manufacture_year').notNullable()
    table.integer('renavam').notNullable()
    table.integer('capacity').notNullable()
    table.integer('patrimony_number').notNullable()
    table.boolean('is_active').notNullable().default(true)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })

exports.down = (knex) =>
  knex.schema
    .dropTable('vehicles')
    .then(() => console.log('Tabela de Veículos excluída'))

