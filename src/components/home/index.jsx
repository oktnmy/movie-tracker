import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to Movie Tracker</h1>
      {currentUser && (
        <p>Hello, {currentUser.displayName || currentUser.email}!</p>
      )}
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
        marginTop: '30px',
        maxWidth: '800px',
        margin: '30px auto'
      }}>
        <Link to="/search" style={{ textDecoration: 'none' }}>
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#007bff', 
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}>
            <h3>🔍 Search Movies</h3>
            <p>Find new movies and TV shows</p>
          </div>
        </Link>
        
        <Link to="/favorites" style={{ textDecoration: 'none' }}>
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#28a745', 
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            <h3>❤️ My Favorites</h3>
            <p>View your favorite movies</p>
          </div>
        </Link>
        
        <Link to="/watchlist" style={{ textDecoration: 'none' }}>
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#17a2b8', 
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            <h3>📺 Watchlist</h3>
            <p>Movies to watch later</p>
          </div>
        </Link>
        
        <Link to="/profile" style={{ textDecoration: 'none' }}>
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#6f42c1', 
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            <h3>👤 Profile</h3>
            <p>Manage your account</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
