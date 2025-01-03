const { Pool } = require('pg');

const pool = new Pool({
    user: 'usach',
    host: 'localhost',
    database: 'usach_segura',
    password: 'usach2024',
    port: 5432
});

module.exports = pool;
