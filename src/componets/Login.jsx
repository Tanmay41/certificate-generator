import React, { useState, useEffect } from 'react';
import '../App.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is logged in:', user);
        navigate('/');
      } else {
        console.log('User is logged out');
      }
    });

    return () => unsubscribe();// eslint-disable-next-line
  }, []);

  const register = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Registration successful, user will be automatically logged in
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful, user will be redirected by the useEffect hook
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Google login successful, user will be redirected by the useEffect hook
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login / Register</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={login}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your email" required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your password" required />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring">Login</button>
            <button onClick={register} type="button" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring">Register</button>
          </div>
          <button onClick={googleLogin} type="button" className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring mb-4">Login with Google</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
