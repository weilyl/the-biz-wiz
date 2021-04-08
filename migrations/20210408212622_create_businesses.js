exports.up = function (knex) {
  return knex.schema.createTable("businesses", function (t) {
    t.increments("id").unsigned().primary();
    t.string("business_name").notNull();
    t.string("user_name").notNull();
    t.string("password").notNull();
    t.string("address").notNull();
    t.string("type").notNull();
    t.string("logo").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("businesses");
};
