const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Set up PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "13.232.80.168",
  database: "postgres",
  password: "kishore",
  port: "5432",
});

// Route to handle user registration (no encryption)
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );
    res.status(201).json({ message: 'User registered successfully!', user: newUser.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to handle user login (no password encryption)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    if (user.rows.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful', user: user.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(5000, () => {
  console.log(`Server is running `);
});
