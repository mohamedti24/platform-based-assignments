const movieModel = require('../models/movie-model');

const searchMovie = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ message: 'parameter is required' });

  const data = await movieModel.searchMovie(query);
  res.json(data);
};

const trendingMovies = async (req, res) => {
  const data = await movieModel.getTrending();
  res.json(data);
};

module.exports = { searchMovie, trendingMovies };
