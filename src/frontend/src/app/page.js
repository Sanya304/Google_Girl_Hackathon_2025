import Image from "next/image";
import Logo from "@/components/Logo";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import githublogo from "../../public/githublogo.png";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="h-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-evenly my-4">
          <div className="gif"></div>
          <div className="w-[35%]">
            <Logo className="mx-auto w-full" />
            <div className="bg-gray-500 rounded-xl p-5 mt-5 text-accent text-xl">
              <p className="italic">
                Smart tax solutions with AI—fast, accurate, and hassle-free!
              </p>

              {/* Buttons Section */}
              <div className="mt-5 space-y-3">
                {/* Get Started */}
                <Link href="/chat">
                  <p className="text-blackish bg-accent p-3 rounded-xl text-lg text-center font-black hover:bg-opacity-80 transition duration-200">
                    Let's Get Started!
                  </p>
                </Link>

                {/* View on GitHub */}
                <Link
                  href="https://github.com/Sanya304/TaxEraAI"
                  target="_blank"
                >
                  <div className="flex gap-2 justify-center bg-blackish p-3 rounded-xl text-lg text-center items-center hover:bg-gray-700 transition duration-200">
                    <Image src={githublogo} width={30} />
                    View on GitHub
                  </div>
                </Link>

                {/* New: Subscribe to Newsletter */}
                <div className="bg-blackish p-4 rounded-xl mt-2">
                  <p className="text-center text-lg">📩 Stay Updated!</p>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 mt-2 text-black rounded-lg"
                  />
                  <button className="w-full mt-2 bg-accent p-2 rounded-lg text-blackish font-bold hover:bg-opacity-80 transition duration-200">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
