'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post('api/users/signup', user);
      console.log('successs', response.data);
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="font-poppins flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white bg-opacity-30 p-10 shadow-lg backdrop-blur-lg">
        <h1 className="text-center text-4xl font-bold text-white drop-shadow-lg">
          {loading ? 'Signing you in .. ' : 'Sign Up'}
        </h1>
        <div className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white">
              Username
            </label>
            <input
              className="mb-4 w-full rounded-lg border border-gray-300 bg-gray-100 bg-opacity-40 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              className="mb-4 w-full rounded-lg border border-gray-300 bg-gray-100 bg-opacity-40 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              className="mb-4 w-full rounded-lg border border-gray-300 bg-gray-100 bg-opacity-40 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
            />
          </div>
        </div>
        <button
          onClick={onSignUp}
          className="mt-6 w-full transform rounded-lg bg-purple-600 py-2 font-semibold text-white transition-transform hover:scale-105 hover:bg-purple-700"
        >
          {buttonDisabled ? 'No Sign Up' : 'Sign Up'}
        </button>
        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-white transition duration-300 hover:text-purple-300"
          >
            Already have an account? Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
