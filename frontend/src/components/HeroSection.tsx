import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaHeart, FaCartPlus, FaRegUser } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";

const HeroSection = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [userMenu, setUserMenu] = useState(false);

  const categories = {
    Men: ["Sneakers", "Boots", "Formal Shoes", "Sandals & Flip Flops", "Slip-ons and Loafers"],
    Women: ["Sneakers", "Boots", "Heels", "Flats", "Sandals & Flip Flops"],
    Kids: ["Sneakers", "Boots", "Sandals", "School Shoes"]
  };

  return (
    <div className="bg-black border-b-4 border-white relative">
      <div className="flex items-center justify-between px-4 py-3 relative z-40">
        <h1 className="text-2xl font-bold text-white">SneakerFactory</h1>
        <div className="relative flex-1 max-w-xl mx-4 hidden sm:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-full focus:outline-none text-white bg-black"
          />
          <IoSearchSharp className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white" size={20} />
        </div>
        <div className="flex items-center space-x-4 text-gray-300">
          <IoSearchSharp size={22} className="sm:hidden cursor-pointer" onClick={() => setShowSearch(!showSearch)} />
          <FaHeart size={20} className="text-green-600 cursor-pointer" />
          <FaCartPlus size={22} className="cursor-pointer" />
          <div className="relative z-50">
            <FaRegUser className="cursor-pointer" onClick={() => setUserMenu(!userMenu)} />
            {userMenu && (
              <div className="absolute right-0 top-[50px] w-40 bg-white text-black shadow-md rounded-lg p-2 z-50">
                <a href="#" className="flex justify-between items-center p-2 hover:bg-gray-200">Sign Up <FaArrowRight /></a>
                <a href="#" className="flex justify-between items-center p-2 hover:bg-gray-200">Login <FaArrowRight /></a>
              </div>
            )}
          </div>
          <FiMenu size={24} className="sm:hidden cursor-pointer" onClick={() => setMenuOpen(true)} />
        </div>
      </div>

      {showSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative w-full max-w-lg p-4">
            <input type="text" placeholder="Search..." className="w-full p-3 border border-gray-300 rounded-full focus:outline-none text-black" />
            <FiX size={28} className="absolute top-2 right-4 text-white cursor-pointer" onClick={() => setShowSearch(false)} />
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-center z-50 text-white">
          <FiX size={28} className="absolute top-5 right-5 cursor-pointer" onClick={() => setMenuOpen(false)} />
          <nav className="text-xl space-y-6">
            <a href="#" className="block hover:text-orange-900">Home</a>
            <a href="#" className="block hover:text-orange-900">Shop</a>
            <a href="#" className="block hover:text-orange-900">Contact</a>
          </nav>
        </div>
      )}

      <nav className="bg-gray-100 text-black relative z-30">
        <ul className="flex justify-center space-x-8 py-3">
          {["Men", "Women", "Kids"].map((category) => (
            <li key={category} className="relative cursor-pointer group hover:text-green-500"
                onMouseEnter={() => setDropdown(category)}
                onMouseLeave={() => setDropdown(null)}>
              <span className="relative pb-2 after:block after:absolute after:w-full after:h-[2px] after:bg-green-500 after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                {category}
              </span>
              {dropdown === category && (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-3 w-[600px] bg-white text-black p-4 grid grid-cols-3 gap-4 rounded-lg z-50"
                     onMouseEnter={() => setDropdown(category)}
                     onMouseLeave={() => setDropdown(null)}>
                  {categories[category].map((item, index) => (
                    <a key={index} href="#" className="hover:text-green-500">{item}</a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default HeroSection;
