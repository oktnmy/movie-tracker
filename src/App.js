import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/authContext';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Header from './components/header';
import Dashboard from './components/home';
import Search from './components/pages/Search';
import Favorites from './components/pages/Favorites';
import Watchlist from './components/pages/Watchlist';
import Profile from './components/pages/Profile';

function AppContent() {
  const { userLoggedIn } = useAuth();

  return (
    <Router>
      <div className="w-full h-screen flex flex-col">
        <Header />
        <Routes>
          <Route 
            path="/login" 
            element={!userLoggedIn ? <Login /> : <Navigate to="/dashboard" replace />} 
          />
          <Route 
            path="/register" 
            element={!userLoggedIn ? <Register /> : <Navigate to="/dashboard" replace />} 
          />
          <Route 
            path="/dashboard" 
            element={userLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/search" 
            element={userLoggedIn ? <Search /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/favorites" 
            element={userLoggedIn ? <Favorites /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/watchlist" 
            element={userLoggedIn ? <Watchlist /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/profile" 
            element={userLoggedIn ? <Profile /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/" 
            element={<Navigate to={userLoggedIn ? "/dashboard" : "/login"} replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
