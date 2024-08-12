const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'banner_db'
});

db.connect((err) => {
    if (err) {
        console.error('Could not connect to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// Fetch the most recent banner data with fallback
app.get('/api/banner', (req, res) => {
    if (!db._connectCalled) {
        return res.json({ description: 'Welcome to our website!', timer: 30, link: '#' });
    }

    db.query('SELECT * FROM banner_data ORDER BY id DESC LIMIT 1', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results[0] || { description: 'Welcome to our website!', timer: 30, link: '#' });
    });
});

// Save new banner data with fallback
app.post('/api/banner', (req, res) => {
    if (!db._connectCalled) {
        console.log('Database is not connected. Banner data will not be saved.');
        return res.status(200).json({ message: 'Banner data updated, but not saved to the database.' });
    }

    const { description, timer, link } = req.body;
    const query = 'INSERT INTO banner_data (description, timer, link) VALUES (?, ?, ?)';
    db.query(query, [description, timer, link], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(201).json({ message: 'Banner data saved successfully' });
    });
});
