import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const firestoreService = {
  addToFavorites: async (uid, movieId) => {
    try {
      const userDocRef = doc(db, "profiles", uid);
      await updateDoc(userDocRef, {
        favorites: arrayUnion(movieId)
      });
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  },

  removeFromFavorites: async (uid, movieId) => {
    try {
      const userDocRef = doc(db, "profiles", uid);
      await updateDoc(userDocRef, {
        favorites: arrayRemove(movieId)
      });
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  },

  addToWatchlist: async (uid, movieId) => {
    try {
      const userDocRef = doc(db, "profiles", uid);
      await updateDoc(userDocRef, {
        watchlist: arrayUnion(movieId)
      });
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  },

  removeFromWatchlist: async (uid, movieId) => {
    try {
      const userDocRef = doc(db, "profiles", uid);
      await updateDoc(userDocRef, {
        watchlist: arrayRemove(movieId)
      });
    } catch (error) {
      console.error("Error removing from watchlist:", error);
    }
  },

  getUserProfile: async (uid) => {
    try {
      const userDocRef = doc(db, "profiles", uid);
      const userDoc = await getDoc(userDocRef);
      return userDoc.exists() ? userDoc.data() : null;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  },

  updateProfile: async (uid, updates) => {
    try {
      const userDocRef = doc(db, "profiles", uid);
      await updateDoc(userDocRef, updates);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }
};
