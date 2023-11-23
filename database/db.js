const { Pool } = require("pg");
require("dotenv").config();

// const pool = new Pool({
//   host: "localhost",
//   port: 5432,
//   user: "postgres",
//   password: "postgres",
//   database: "migracode_final_project"
// });

//   user: process.env.DB_PASSWORD || "postgres",
//   password: process.env.DB_PASSWORD || "bygaga",
//   database: "portfolio",

const pool = new Pool({
  host: "db.byvzdpgaevzslrfcvbig.supabase.co",
  port: 5432,
  user: "postgres",
  password: process.env.DB_PASSWORD,
  database: "postgres",
});

module.exports = pool;
