import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white sticky top-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          <span className="animate-pulse">JobSeeker</span> <span className="text-red-500">Pro</span>
        </Link>
        <ul className="flex space-x-4">
          <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
          {/* <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
          <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li> */}
        </ul>
      </div>
    </nav>
  );
}
