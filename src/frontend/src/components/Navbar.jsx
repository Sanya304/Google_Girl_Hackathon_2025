import React from "react";
import Logo from "./Logo";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="px-[10%] py-5 pt-10 bg-blackish text-white">
      <div className="flex items-center justify-between">
        {/* Left Section: Branding */}
        <div>
          <h1 className="font-black text-[2rem] leading-6">TaxEraAI</h1>
          <p className="text-lg text-gray-300">
            Welcome to the Future of Taxes 💸🏛️
          </p>
        </div>

        {/* Center Section: Navigation Links */}
        <div className="hidden md:flex gap-8 text-lg">
          <Link
            href="/"
            className="hover:text-gray-400 transition duration-200"
          >
            Home
          </Link>
          <Link
            href="/Tax-Calculator"
            className="hover:text-gray-400 transition duration-200"
          >
            Calculator
          </Link>
          <Link
            href="/pricing"
            className="hover:text-gray-400 transition duration-200"
          >
            Pricing
          </Link>
          <Link
            href="/consultance"
            className="hover:text-gray-400 transition duration-200"
          >
            Expert consutlant
          </Link>
          <Link
            href="/blog"
            className="hover:text-gray-400 transition duration-200"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-400 transition duration-200"
          >
            Contact
          </Link>
        </div>

        {/* Right Section: Call to Action Button */}
        <Link href="/get-started">
          <button className="bg-accent text-black px-5 py-2 rounded-lg font-semibold hover:bg-opacity-80 transition duration-200">
            Get Started
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
