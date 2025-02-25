import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.jpeg";

const Logo = () => {
  return (
    <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-md">
      <Link href="/" className="flex items-center">
        <Image
          src={logo}
          width={75}
          height={75}
          alt="TaxEraAI Logo"
          priority
          className="rounded-lg shadow-lg hover:scale-110 transition-transform duration-300"
        />
      </Link>
      <div>
        <Link
          href="/"
          className="hover:opacity-80 transition-opacity duration-200"
        >
          <h1 className="font-extrabold text-[2.5rem] md:text-[3rem] leading-tight text-gray-700">
            TaxEraAI
          </h1>
        </Link>
        <p className="text-lg md:text-xl text-gray-600 ml-1 italic">
          Your AI-Driven Tax Partner. 💸🏛️
        </p>
      </div>
    </div>
  );
};

export default Logo;
