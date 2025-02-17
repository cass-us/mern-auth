
 import Header from '../components/Header';
// import Cover from '../components/Cover.tsx';
// import MainSlide from "../components/MainSlide.tsx";
import Category from '../components/Category.tsx';
import HeroBackground from '../components/HeroBackground.tsx';
const HeroSection = () => {
  return (
   <section>
     <Header/> 
    <HeroBackground/>
    {/* <MainSlide/> */}
    <Category/>

   </section>
  )
}

export default HeroSection