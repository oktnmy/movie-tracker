import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });

      // Auto-create profile document in Firestore
      await createUserProfile(user);

      // Check if provider is email and password login
      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      // Check if the auth provider is google or not
      const isGoogle = user.providerData.some(
        (provider) => provider.providerId === "google.com"
      );
      setIsGoogleUser(isGoogle);

      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }

    setLoading(false);
  }

  // Function to auto-create user profile document
  async function createUserProfile(user) {
    try {
      // Create document reference with user's UID as document ID
      const userDocRef = doc(db, "profiles", user.uid);
      
      // Check if document already exists
      const userDoc = await getDoc(userDocRef);
      
      // Only create if document doesn't exist
      if (!userDoc.exists()) {
        const profileData = {
          name: user.displayName || "User",
          email: user.email,
          profilePic: user.photoURL || "",
          watchlist: [],
          favorites: [],
          createdAt: new Date().toISOString()
        };
        
        // Create the document
        await setDoc(userDocRef, profileData);
        console.log("User profile created successfully");
      } else {
        console.log("User profile already exists");
      }
    } catch (error) {
      console.error("Error creating user profile:", error);
    }
  }

  const value = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    setCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
