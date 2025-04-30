import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider, githubProvider } from '../../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser({ email: result.user.email });
      return { success: true };
    } catch (error) {
      let message = 'Login failed';
      if (error.code === 'auth/user-not-found') message = 'User does not exist';
      else if (error.code === 'auth/wrong-password') message = 'Incorrect password';
      else if (error.code === 'auth/invalid-email') message = 'Invalid email format';
      return { success: false, message };
    }
  };

  const signup = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser({ email: result.user.email });
      return { success: true };
    } catch (error) {
      let message = 'Signup failed';
      if (error.code === 'auth/email-already-in-use') message = 'Email already exists';
      else if (error.code === 'auth/weak-password') message = 'Weak password';
      return { success: false, message };
    }
  };

  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    setUser({ email: result.user.email });
  };

  const facebookLogin = async () => {
    const result = await signInWithPopup(auth, facebookProvider);
    setUser({ email: result.user.email });
  };

  const githubLogin = async () => {
    const result = await signInWithPopup(auth, githubProvider);
    setUser({ email: result.user.email });
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, googleLogin, facebookLogin, githubLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
