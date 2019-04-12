exports.up = function(knex, Promise) {
  return knex.schema.createTable("games", tbl => {
    tbl.increments();
    tbl.string("title", 128).notNullable().unique()
    tbl.string("genre", 128).notNullable()
    tbl.integer("released").unsigned()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("games")
};
