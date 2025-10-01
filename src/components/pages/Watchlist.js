import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import { firestoreService } from '../../services/firestoreService';
import { tmdbService } from '../../services/tmdbService';
import { Link } from 'react-router-dom';
import { FiTrash2, FiSearch } from 'react-icons/fi';

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      fetchWatchlist();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const fetchWatchlist = async () => {
    if (!currentUser) return;
    setLoading(true);
    
    const profile = await firestoreService.getUserProfile(currentUser.uid);
    if (profile && profile.watchlist) {
      const watchlistData = await Promise.all(
        profile.watchlist.map(async (watchlistId) => {
          // Corrected: Using original underscore format
          const [id, mediaType] = watchlistId.split('_');
          const details = await tmdbService.getMovieDetails(id, mediaType);
          return details ? { ...details, media_type: mediaType } : null;
        })
      );
      setWatchlist(watchlistData.filter(item => item !== null));
    }
    setLoading(false);
  };

  const removeFromWatchlist = async (item) => {
    // Corrected: Using original underscore format
    const movieId = `${item.id}_${item.media_type}`;
    // Corrected: Using original function name
    await firestoreService.removeFromWatchlist(currentUser.uid, movieId);
    await fetchWatchlist();
  };

  if (loading) {
    return <p className="text-center text-gray-500 text-xl mt-10">Loading your watchlist...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen mt-10">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">My Watchlist 📺</h2>
        <p className="text-gray-500">Movies and shows you want to watch later.</p>
      </div>
      
      {watchlist.length === 0 ? (
        <div className="text-center mt-16">
          <p className="text-xl text-gray-600 mb-4">Your watchlist is empty.</p>
          <p className="text-gray-500 mb-6">Let's find something new to watch!</p>
          <Link to="/search" className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition-colors shadow-lg">
            <FiSearch />
            Search Movies & TV
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {watchlist.map((item) => (
            <div key={`${item.id}-${item.media_type}`} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
              <div className="relative">
                <img
                  src={item.poster_path ? `https://image.tmdb.org/t/p/w400${item.poster_path}` : 'https://via.placeholder.com/400x600?text=No+Image'}
                  alt={item.title || item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2 text-center text-white">
                  <h4 className="font-bold text-md">{item.title || item.name}</h4>
                  <p className="text-sm mt-1">{new Date(item.release_date || item.first_air_date).getFullYear() || 'N/A'}</p>
                  <button 
                    onClick={() => removeFromWatchlist(item)} 
                    className="mt-4 flex items-center justify-center gap-2 w-auto text-xs bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <FiTrash2 /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}