const express = require('express');
const movieController = require('../controllers/movie-controller');
const router = express.Router();

router.get('/movies', movieController.searchMovie);
router.get('/trending', movieController.trendingMovies);

module.exports = router;
