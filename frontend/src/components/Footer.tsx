const Footer = () => {
    return (
      <section className="bg-black text-white py-12 mt-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">SneakerFactory</h2>
              <p className="text-gray-400">
                Your go-to store for premium sneakers. Explore top brands and exclusive collections.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="text-gray-400 space-y-2">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">Shop</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
           <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="text-gray-400"> 123 Sneaker St, Johannesburg</p>
              <p className="text-gray-400"> +27 82 761 2678</p>
              <p className="text-gray-400"> cassiusmaropene@gmail.com</p>
            </div>
          </div>
  
          <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} SneakerFactory. All rights reserved.</p>
          </div>
        </div>
      </section>
    );
  };
  
  export default Footer;
  