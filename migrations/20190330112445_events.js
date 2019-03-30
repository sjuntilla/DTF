exports.up = function(knex, Promise) {
  return knex.schema.createTable("events", table => {
    table.increments();
    table.string("latitude").notNullable();
    table.string("longitude").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("events");
};
