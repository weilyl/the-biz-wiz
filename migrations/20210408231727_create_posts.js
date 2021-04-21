exports.up = function (knex) {
  return knex.schema.createTable('posts', function (t) {
    t.increments('id').unsigned().primary();
    t.string('title').notNull();
    t.string('content').notNull();
    t.timestamps(true, true);
    t.integer('business_id').unsigned().notNullable();
    t.foreign('business_id')
      .references('id')
      .inTable('businesses')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('posts');
};
