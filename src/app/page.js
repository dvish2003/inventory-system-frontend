'use client';

import { useEffect } from "react";

export default function Home() {

  const checkIsAuth = () => {
    const isAuth = localStorage.getItem("isAuth");

    if (!isAuth) {
      localStorage.setItem("isAuth", "false");
    }
  };

  useEffect(() => {
    checkIsAuth();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Home Page</h1>
        <p className="text-lg text-gray-700">
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.        </p>
      </main>
    </div>
  );
}