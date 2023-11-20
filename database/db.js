const { Pool } = require("pg");

// const pool = new Pool({
//   host: "localhost",
//   port: 5432,
//   user: "postgres",
//   password: "postgres",
//   database: "migracode_final_project"
// });

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: process.env.DB_PASSWORD || "postgres",
  password: process.env.DB_PASSWORD || "bygaga",
  database: "portfolio",
});

module.exports = pool;
