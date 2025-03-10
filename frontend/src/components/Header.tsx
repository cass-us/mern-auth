import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { IoSearchSharp } from "react-icons/io5";
import logo from "./assets/sneaker.png";
import coverImage from "./assets/cover.jpg";
import image1 from "../dumbData/assets/NIKE+DUNK+HI+RETRO.png";
import image2 from "../dumbData/assets/NIKE+DUNK+LOW+RETRO.png";
import HeroBackground from "./HeroBackground"; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <><HeroBackground />
     <header
        className="relative h-[70vh] flex flex-col items-center justify-center px-4"
        style={{
          backgroundImage: `url(${coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-4 left-4 w-18 bg-black rounded-4xl mb-4">
          <img src={logo} className="w-16" alt="Logo" />
        </div>
        <div className="absolute top-4 right-4 flex gap-4">
          <button onClick={() => setSearchOpen(true)} className="text-white focus:outline-none">
            <IoSearchSharp size={24} />
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        <div className="hidden md:flex gap-4 bg-white opacity-80 m-4 rounded-lg h-8 w-64">
          <Link to="/join-us" className="text-white bg-gray-500 px-4 py-2 rounded text-sm sm:text-xs">
            Join Us
          </Link>
          <div className="mt-0.5 space-x-2">
            <Link to="/OurStores" className="text-black text-sm sm:text-xs">Find Our Store</Link>
            <Link to="/login" className="text-black text-sm sm:text-xs">Sign In</Link>
          </div>
        </div>
        {searchOpen && (
          <div className="fixed inset-0 text-white flex flex-col items-center z-10 mt-28">
            <div className="relative w-3/4 md:w-1/2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-4 pl-10 bg-white rounded-md focus:outline-none text-sm sm:text-xs"
              />
              <IoSearchSharp className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" size={20} />
            </div>
            <h2 className="text-lg sm:text-sm font-bold mb-4 mt-8">Most Searched</h2>
            <ul className="text-center text-sm sm:text-xs">
              <div className="grid grid-cols-2 space-x-2 space-y-2 p-2">
                {[image1, image2, image2, image2].map((img, index) => (
                  <div
                    key={index}
                    className="h-24 w-28 bg-black opacity-80 rounded-md text-black text-sm"
                    style={{ backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" }}
                  >
                    <Link to="/"><li>{["Trending", "New Releases", "Best Sellers", "Sport Shoes"][index]}</li></Link>
                  </div>
                ))}
              </div>
            </ul>
          </div>
        )}
        {menuOpen && (
          <div className="absolute top-14 left-0 w-full text-white text-sm sm:text-xs p-4 shadow-lg md:hidden">
            <nav>
              <ul className="space-y-2">
                <Link to="/" className="block">New Arrival</Link>
                <Link to="/" className="block">Men</Link>
                <Link to="/" className="block">Women</Link>
                <Link to="/" className="block">Kids</Link>
              </ul>
              <div className="mt-4">
                <Link to="/join-us" className="block text-center bg-gray-500 py-2 mt-2">Join Us</Link>
                <Link to="/signup" className="block text-center bg-white text-black py-2">Sign Up</Link>
                <Link to="/login" className="block text-center bg-gray-700 py-2 mt-2">Sign In</Link>
                <p className="mt-4 text-white">Join our community for exclusive offers and latest trends.</p>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
