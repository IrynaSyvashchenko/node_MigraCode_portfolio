const { Pool } = require("pg");
require("dotenv").config();

// const pool = new Pool({
//   host: "localhost",
//   port: 5432,
//   user: process.env.DB_USERNAME || "postgres",
//   password: process.env.DB_PASSWORD || "postgres",
//   database: process.env.DB_NAME || "migracode_final_project",
// });

const pool = new Pool({
  host: "db.byvzdpgaevzslrfcvbig.supabase.co",
  port: 5432,
  user: "postgres",
  database: "postgres",
  password: process.env.DB_PASSWORD,
});

// const pool = new Pool({
//   host: "localhost",
//   port: 5432,
//   user: "postgres",
//   password: "bygaga",
//   database: "portfolio",
// });

module.exports = pool;
