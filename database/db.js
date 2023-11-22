const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "migracode_final_project",
});

//   user: process.env.DB_PASSWORD || "postgres",
//   password: process.env.DB_PASSWORD || "bygaga",
//   database: "portfolio",

// const pool = new Pool({
//   host: "localhost",
//   port: 5432,
//   user: "postgres",
//   password: "bygaga",
//   database: "portfolio",
// });

module.exports = pool;
