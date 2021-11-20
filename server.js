const express = require("express");
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));
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

// db.query("SELECT * FROM candidates", (err, rows) => {
//     console.log(rows);
// });

// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(row);
// });
// The question mark defines this as a prepared statement.
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
//               VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});