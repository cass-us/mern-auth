
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import image1 from "../dumbData/assets/NIKE+DUNK+HI+RETRO.png";
import image2 from "../dumbData/assets/NIKE+DUNK+LOW+RETRO.png";
import image3 from "../dumbData/assets/W+AIR+FORCE+1+'07+PRM.png";
import image4 from "../dumbData/assets/W+NIKE+DUNK+LOW+NN.png";
import image5 from "../dumbData/assets/pexels-themagpie-87835.jpg";
import image6 from "../dumbData/assets/NIKE+DUNK+HI+RETRO.png";
//import paypalButton from "./buttons/PaypalButton.js";
const images = [image1, image2, image3, image4, image5, image6];

const MainSlide = () => {
  return (
    <div className="overflow-hidden w-full bg-black opacity-80 py-4">
      <motion.div
        className="flex w-max"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
       
      >
        {[...images, ...images].map((img, index) => (
          <div key={index} className="w-48 h-48 mx-2 flex-shrink-0 bg-gray-300">
            <Link to="/"><img src={img} alt={`slide-${index}`} className="w-full h-full object-cover rounded-lg" /></Link>
          </div>
        ))}
      </motion.div>
      <div>
      </div>
    </div>
    
  );
};

export default MainSlide;
