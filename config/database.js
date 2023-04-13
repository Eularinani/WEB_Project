const pg = require('pg');

  const Pool = pg.Pool
  const pool = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port:5433,
      max: 20});
  
module.exports = pool;

