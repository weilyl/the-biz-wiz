exports.up = function (knex) {
  return knex.schema.createTable("businesses", function (t) {
    t.increments("id").unsigned().primary();
    t.string("business_name").notNull();
    t.string("user_name").notNull().unique();
    t.string("password").notNull();
    t.string("street_address").notNull();
    t.string("city").notNull();
    t.string("state").notNull();
    t.integer("zip").notNull();
    t.string("business_type").notNull();
    t.string("acct_type").notNull();
    t.string("logo");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("businesses");
};
