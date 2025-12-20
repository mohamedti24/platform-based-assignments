const axios = require('axios');

const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN = process.env.TMDB_READ_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`
};

const searchMovie = async (query) => {
  const res = await axios.get(`${BASE_URL}/search/movie`, {
    headers,
    params: { query }
  });
  return res.data;
};

const getTrending = async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/day`, { headers });
  return res.data;
};

module.exports = { searchMovie, getTrending };
