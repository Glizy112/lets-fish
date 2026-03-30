const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('./db/database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

// Test route
app.get('/', (req, res) => {
  res.send('Let’s Fish backend running');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});