
import { motion } from "framer-motion";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";


const images = [image1, image2, image3, image4, image5, image6];

const MainSlide = () => {
  return (
    <div className="overflow-hidden w-full bg-gray-200 py-4">
      <motion.div
        className="flex w-max"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      >
        {[...images, ...images].map((img, index) => (
          <div key={index} className="w-48 h-48 mx-2 flex-shrink-0">
            <img src={img} alt={`slide-${index}`} className="w-full h-full object-cover rounded-lg" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MainSlide;
