'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments();
    table.string('brand').notNullable().defaultTo('');
    table.string('image').notNullable().defaultTo('');
    table.string('price').notNullable().defaultTo('');
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('products');
};
