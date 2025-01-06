const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'usach_segura',
    password: 'segura2024',
    port: 5432
});

module.exports = pool;
