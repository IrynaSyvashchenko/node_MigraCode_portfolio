const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "bygaga",
  //   database: "migracode_final_project",
  database: "portfolio",
});

module.exports = pool;
