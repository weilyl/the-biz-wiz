exports.up = function (knex) {
  return knex.schema.createTable('comments', function (t) {
    t.increments('id').unsigned().primary();
    t.string('content').notNull();
    t.timestamp(true, true);
    t.integer('post_id').unsigned().notNullable();
    t.integer('business_id').unsigned().notNullable();
    t.foreign('post_id').references("id").inTable("posts").onDelete("CASCADE");
    t.foreign('business_id')
      .references('id')
      .inTable('businesses')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('comments');
};
