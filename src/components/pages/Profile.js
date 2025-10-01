import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import { firestoreService } from '../../services/firestoreService';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { FaUserEdit, FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa'; // Optional: for icons

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, [currentUser]);

  const fetchProfile = async () => {
    if (!currentUser) return;
    
    const userProfile = await firestoreService.getUserProfile(currentUser.uid);
    setProfile(userProfile);
    setName(userProfile?.name || '');
    setProfilePic(userProfile?.profilePic || '');
  };

  const handleSave = async () => {
    if (!currentUser) return;
    
    const updates = { name, profilePic };
    await firestoreService.updateProfile(currentUser.uid, updates);
    setEditing(false);
    await fetchProfile();
  };

  if (!profile) {
    return <p className="text-center text-gray-500 mt-10">Loading profile...</p>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-100 mt-10">
      <div className="max-w-2xl mx-auto">
        
        {/* Back to Dashboard Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors">
            <FaArrowLeft />
            Back to Dashboard
        </Link>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h2>
      
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
            {profilePic && (
              <img
                src={profilePic}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-200"
              />
            )}
            
            <div className="w-full">
              {editing ? (
                // --- Editing View ---
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Name:</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Profile Picture URL:</label>
                    <input
                      type="url"
                      value={profilePic}
                      onChange={(e) => setProfilePic(e.target.value)}
                      className="p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors shadow"
                    >
                      <FaSave /> Save
                    </button>
                    
                    <button
                      onClick={() => setEditing(false)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors shadow"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // --- Display View ---
                <div className="flex flex-col gap-3">
                  <p className="text-lg"><strong className="font-semibold text-gray-600">Name:</strong> {profile.name || 'Not set'}</p>
                  <p className="text-lg"><strong className="font-semibold text-gray-600">Email:</strong> {profile.email}</p>
                  <p className="text-lg"><strong className="font-semibold text-gray-600">Favorites:</strong> {profile.favorites?.length || 0} items</p>
                  <p className="text-lg"><strong className="font-semibold text-gray-600">Watchlist:</strong> {profile.watchlist?.length || 0} items</p>
                  
                  <button
                    onClick={() => setEditing(true)}
                    className="mt-4 inline-flex items-center gap-2 self-start px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow"
                  >
                    <FaUserEdit /> Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- Navigation Links based on index.jsx --- */}
        <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to="/search" className="p-4 bg-blue-500 text-white rounded-lg text-center font-semibold hover:bg-blue-600 transition-colors">
                    🔍 Search Movies
                </Link>
                <Link to="/favorites" className="p-4 bg-green-500 text-white rounded-lg text-center font-semibold hover:bg-green-600 transition-colors">
                    ❤️ My Favorites
                </Link>
                <Link to="/watchlist" className="p-4 bg-cyan-500 text-white rounded-lg text-center font-semibold hover:bg-cyan-600 transition-colors">
                    📺 Watchlist
                </Link>
            </div>
        </div>

      </div>
    </div>
  );
}