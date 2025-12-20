require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const movieRouter = require('./routes/movie-router');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api', movieRouter);

// serve frontend
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'movie.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
