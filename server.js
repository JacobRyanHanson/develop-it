const express = require("express");
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');

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
// Gets all candidates.
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            data: rows
        });
    });
});
// Gets a single candidate.
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`; // The question mark defines this as a prepared statement.
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            data: row
        });
    });
});
// Deletes a candidate.
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// Creates a candidate.
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = "INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?,?,?)";
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            data: body
        });
    });
});

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});