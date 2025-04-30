import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

  const firebaseConfig = {
  apiKey: "AIzaSyCRK79QGsGJJ_92M5AuWKbl2w_i4HBi7vw",
  authDomain: "moonlit-oven-441517-m8.firebaseapp.com",
  projectId: "moonlit-oven-441517-m8",
  storageBucket: "moonlit-oven-441517-m8.firebasestorage.app",
  messagingSenderId: "680064713742",
  appId: "1:680064713742:web:c628d589f62e797dbce85f",
  measurementId: "G-EECGHLGRKG"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Add Firestore
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const githubProvider = new GithubAuthProvider();


