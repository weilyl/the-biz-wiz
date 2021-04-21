exports.up = function (knex) {
  return knex.schema.createTable("businesses", function (t) {
    t.increments("id").unsigned().primary();
    t.string("business_name").notNull();
    t.string("user_name").notNull().unique();
    t.string("email").notNull();
    t.string("password").notNull();
    t.string("first_name");
    t.string("last_name");
    t.string("street_address");
    t.string("city");
    t.string("state");
    t.integer("zip");
    t.string("business_type").notNull();
    t.string("acct_type").notNull();
    t.string("logo");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("businesses");
};
