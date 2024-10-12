'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('api/users/login', user);
      console.log('successs', response.data);
      toast.success('Login Success');
      router.push('/profile');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="font-poppins flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white bg-opacity-30 p-10 shadow-2xl backdrop-blur-md">
        <h1 className="text-center text-4xl font-extrabold text-white drop-shadow-lg">
          {loading ? 'Logging in...' : 'Login'}
        </h1>
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              className="mb-4 w-full rounded-lg border border-gray-300 bg-gray-100 bg-opacity-40 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="mb-4 w-full rounded-lg border border-gray-300 bg-gray-100 bg-opacity-40 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
            />
          </div>
        </div>
        <button
          onClick={onLogin}
          className="mt-6 w-full transform rounded-lg bg-blue-600 py-2 font-semibold text-white transition-transform hover:scale-105 hover:bg-blue-700"
        >
          {buttonDisabled ? 'No login' : 'Log In'}
        </button>
        <div className="mt-6 text-center">
          <Link
            href="/signup"
            className="text-sm font-medium text-white transition duration-300 hover:text-blue-300"
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
