import  { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <nav className=" bg-gray-800 p-4 text-white">
      <ul className="flex justify-start space-x-8 relative">
        <li>
          <Link to="/" className="hover:text-gray-300">New Arrival</Link>
        </li>
        {["Men", "Women", "Kids"].map((category) => (
          <li
            key={category}
            className="relative"
            onMouseEnter={() => setHovered(category)}
            onMouseLeave={() => setHovered(null)}
          >
            <Link to="/" className="hover:text-gray-300">{category}</Link>
            {hovered === category && (
              <div className="absolute left-0 top-full w-full bg-gray-700 text-center py-4">
                <Link to="/" className="block py-2 hover:bg-gray-600">Clothing</Link>
                <Link to="/" className="block py-2 hover:bg-gray-600">Shoes</Link>
                <Link to="/" className="block py-2 hover:bg-gray-600">Accessories</Link>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
