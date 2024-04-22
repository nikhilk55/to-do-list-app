
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';

// Sign up function
const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User signed up:', user);
    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};
//Login function
const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in:', user);
      return user;
    } catch (error: any) {
      let errorMessage = 'An error occurred. Please try again.'; 
 
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password. Please try again or sign up.';
      }
    console.error('Error logging in:', error);
    throw new Error(errorMessage);
    }
};
  

// Logout function
const logout = async () => {
  try {
    await signOut(auth);
    console.log('User logged out');
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export { signUp, login, logout };
