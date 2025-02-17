import React from "react";

const brands = [
  {
    name: "Nike",
    logo: "https://www.pixelstalk.net/wp-content/uploads/2015/12/nike-logo-wallpapers-white-black.jpg",
  },
  {
    name: "Adidas",
    logo: "https://static.vecteezy.com/system/resources/previews/010/994/345/original/adidas-logo-white-symbol-with-name-clothes-design-icon-abstract-football-illustration-with-black-background-free-vector.jpg",
  },
  {
    name: "G-Star",
    logo: "https://i.pinimg.com/736x/f4/06/c2/f406c2ab8a7c0cda5ca1e7f39cf3beea.jpg",
  },
  {
    name: "Reebok",
    logo: "https://lofrev.net/wp-content/photos/2016/06/reebok-logo-1222.png",
  },
  {
    name: "Puma",
    logo: "https://static.vecteezy.com/system/resources/previews/010/994/431/large_2x/puma-logo-black-symbol-with-name-clothes-design-icon-abstract-football-illustration-with-white-background-free-vector.jpg",
  },
  {
    name: "Timberland",
    logo: "https://th.bing.com/th/id/OIP.zWVZ6jf3EnxysM8SIeAM_AHaFL?rs=1&pid=ImgDetMain",
  },
];


const Brand: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-black rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-center mb-4">Popular Brands</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-center items-center">
        {brands.map((brand, index) => (
          <div key={index} className="flex flex-col items-center">
            <img src={brand.logo} alt={brand.name} className="w-32 h-32 object-contain" />
            <span className="mt-2 text-lg font-semibold">{brand.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brand;
