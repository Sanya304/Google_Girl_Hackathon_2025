import Image from "next/image";
import React from "react";
import vertexai from "../../public/vertexai.png";
import githublogo from "../../public/githublogo.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black w-full py-6 text-center text-white">
      <p className="text-sm md:text-md">Made with ❤ by Sanya</p>

      <div className="mt-3 flex items-center justify-center space-x-2">
        <span className="text-sm md:text-md">Powered by</span>
        <Image
          src={vertexai}
          width={50}
          height={50}
          alt="Vertex AI"
          className="ml-1"
        />
      </div>

      <div className="mt-3 flex items-center justify-center space-x-4">
        <Link
          href="https://github.com/Sanya304"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={githublogo}
            width={30}
            height={30}
            alt="GitHub"
            className="hover:opacity-80 transition-opacity duration-200"
          />
        </Link>
      </div>

      <p className="mt-2 text-xs opacity-70">
        &copy; {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
