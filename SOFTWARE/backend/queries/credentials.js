const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'usach_segura',
    password: 'meme',
    port: 5432
});

module.exports = pool;
