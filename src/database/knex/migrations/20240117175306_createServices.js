exports.up = (knex) =>
  knex.schema.createTable('services', (table) => {
    table.increments('id').primary()
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table
      .integer('conductor_id')
      .unsigned()
      .references('id')
      .inTable('conductors')
      .onDelete('CASCADE')
    table
      .integer('vehicle_id')
      .unsigned()
      .references('id')
      .inTable('vehicles')
      .onDelete('CASCADE')

    table.date('service_date').notNullable()
    table.text('model').notNullable()
    table.text('vehicle_type').notNullable()
    table.integer('capacity').notNullable()

    table.text('conductor_name').notNullable()

    table.text('origin_cep').notNullable()
    table.text('origin_street').notNullable()
    table.text('origin_number').notNullable()
    table.text('origin_district').notNullable()
    table.text('origin_city').notNullable()
    table.text('origin_federative_unity').notNullable()
    table.text('origin_local').notNullable()
    table.text('origin_complement').notNullable()

    table.text('destiny_cep').notNullable()
    table.text('destiny_street').notNullable()
    table.text('destiny_number').notNullable()
    table.text('destiny_district').notNullable()
    table.text('destiny_city').notNullable()
    table.text('destiny_federative_unity').notNullable()
    table.text('destiny_local').notNullable()
    table.text('destiny_complement').notNullable()

    table.json('patients').notNullable()
    table.json('companions').notNullable()

    table.text('service_type').notNullable()
    table.text('service_class').notNullable()

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('services')

