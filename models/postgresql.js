const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pfe",
  password: "wafapostgres",
  port: 5432,
});

module.exports = pool;
