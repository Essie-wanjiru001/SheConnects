require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'Server is running',
    env: process.env.NODE_ENV,
    dbHost: process.env.DB_HOST
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Database host:', process.env.DB_HOST);
});