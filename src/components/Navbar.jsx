'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [role,setRole] = useState();

  useEffect(() => {
    const auth = localStorage.getItem("isAuth") === "true";
    const role = localStorage.getItem('role')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAuth(auth);
    setRole(role)
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isAuth", "false");
    window.location.href = "/";
     localStorage.removeItem('email');
      localStorage.re('role');
  };

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold tracking-wide uppercase">
          Inventory System
        </div>

        {isAuth && (
          <ul className="flex items-center space-x-6 text-sm font-medium">
            
              <li key={'cupboard'}>
                <Link href={"/cupboard"} className="hover:text-gray-300 transition">
                  Cupboard
                </Link>
              </li>
               <li key={"place"}>
                <Link href={"/place"} className="hover:text-gray-300 transition">
                  Place
                </Link>
              </li> 
               
             
             {role === 'Admin' && (<>
              <li key={"user"}>
                <Link href={"/auth/user"} className="hover:text-gray-300 transition">
                  User
                </Link>
                </li>
                </>)}
               <li key={"inventory"}>
                <Link href={"/inventory"} className="hover:text-gray-300 transition">
                  Inventory
                </Link>
              </li> 
              
               <li key={"borrowing"}>
                <Link href={"/borrowing"} className="hover:text-gray-300 transition">
                  Borrowing
                </Link>
              </li>
            
          </ul>
        )}

        <div className="flex items-center space-x-3">
          {!isAuth && (
            <Link
              href="/auth/login"
              className="px-4 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition text-sm"
            >
              Login
            </Link>
          )}

          {isAuth && (
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 transition text-sm"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;