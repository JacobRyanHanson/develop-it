const express = require("express");
const db = require('./db/connection');
const inputCheck = require('./utils/inputCheck');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));
app.use('/api', apiRoutes);
// Default response for any other request (Not Found).
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});