const TMDB_API_KEY = 'fb7bb23f03b6994dafc674c074d01761'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbService = {
  searchMovies: async (query) => {
    try {
      const response = await fetch(
        `${BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error searching movies:', error);
      return [];
    }
  },

  getMovieDetails: async (id, mediaType = 'movie') => {
    try {
      const response = await fetch(
        `${BASE_URL}/${mediaType}/${id}?api_key=${TMDB_API_KEY}`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  }
};
