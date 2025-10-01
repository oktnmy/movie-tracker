import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { tmdbService } from '../../services/tmdbService';
import { firestoreService } from '../../services/firestoreService';
import { FiSearch, FiHeart, FiBookmark } from 'react-icons/fi';

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth();

    // Original search logic, as requested
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        const searchResults = await tmdbService.searchMovies(query);
        setResults(searchResults);
        setLoading(false);
    };

    // Original addToFavorites logic
    const addToFavorites = async (item) => {
        if (!currentUser) return;
        const movieId = `${item.id}_${item.media_type || 'movie'}`;
        await firestoreService.addToFavorites(currentUser.uid, movieId);
        alert('Added to favorites!');
    };

    // Original addToWatchlist logic
    const addToWatchlist = async (item) => {
        if (!currentUser) return;
        const movieId = `${item.id}_${item.media_type || 'movie'}`;
        await firestoreService.addToWatchlist(currentUser.uid, movieId);
        alert('Added to watchlist!');
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen mt-10">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">Search Movies & TV Shows</h2>
            </div>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-10">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for movies or TV shows..."
                        className="w-full p-4 pl-12 text-lg border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    <button
                        type="submit"
                        className="absolute inset-y-0 right-0 px-8 py-2 m-2 text-lg bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Search
                    </button>
                </div>
            </form>

            {loading && <p className="text-center text-gray-500 text-xl">Searching...</p>}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {results.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
                        <div className="relative">
                            <img
                                src={item.poster_path ? `https://image.tmdb.org/t/p/w400${item.poster_path}` : 'https://via.placeholder.com/400x600?text=No+Image'}
                                alt={item.title || item.name}
                                className="w-full object-cover min-h-[250px] sm:min-h-[300px] bg-gray-200"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2 text-center text-white">
                                <h4 className="font-bold text-md">{item.title || item.name}</h4>
                                <p className="text-sm mt-1">{new Date(item.release_date || item.first_air_date).getFullYear() || item.media_type}</p>
                                <div className="mt-4 flex flex-col gap-2 w-full px-2">
                                    <button onClick={() => addToFavorites(item)} className="flex items-center justify-center gap-2 w-full text-xs bg-pink-500 px-3 py-2 rounded-full hover:bg-pink-600 transition-colors">
                                        <FiHeart /> Favorite
                                    </button>
                                    <button onClick={() => addToWatchlist(item)} className="flex items-center justify-center gap-2 w-full text-xs bg-cyan-500 px-3 py-2 rounded-full hover:bg-cyan-600 transition-colors">
                                        <FiBookmark /> Watchlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}