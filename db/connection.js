const mysql = require('mysql2');

// Connects to database.
const db = mysql.createConnection(
    {
        host: 'localhost',
        // My MySQL username.
        user: 'root',
        // My MySQL password.
        password: 'YJvGVmwCGu8W4PG',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

module.exports = db;