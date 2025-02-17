import { Link } from "react-router-dom";
import menBackground from "./assets/men_background.jpg";
import womenBackground from "./assets/women_background.jpg";
import kidsBackground from "./assets/kids_background.jpg";

const HeroBackground = () => {
  return (
    <section className="p-6">
      <div className="grid grid-cols-3 gap-4">
        {[
          { image: menBackground, text: "Shop Men", link: "/men" },
          { image: womenBackground, text: "Shop Women", link: "/women" },
          { image: kidsBackground, text: "Shop Kids", link: "/kids" },
        ].map(({ image, text, link }, index) => (
          <Link to={link} key={index} className="relative group overflow-hidden rounded-lg">
            <img src={image} alt={text} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-white text-2xl font-bold bg-black bg-opacity-50 px-6 py-3 rounded-md">
                {text}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HeroBackground;
