import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Category from "./components/Category.tsx";
import ViewProduct from "./components/ViewProduct.tsx";
import Cart from "./components/Cart.tsx";
import HeroSection from "./components/HeroSection.tsx";
import SignUp from "./components/SignUp.tsx";
import Footer from "./components/Footer.tsx";
import Login from "./components/Login.tsx";
import HeroBackground from "./components/HeroBackground.tsx";
import CustomerDashboard from "./components/dashboard/CustomerDashBoard.tsx"; 

function App() {
  return (
    <>
     
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Routes>
        <Route path="/" element={
          <div>
            <HeroSection />
            <HeroBackground />
            <Category />
            <Footer />
          </div>
        } />

        <Route path="/view-product/:id" element={
          <div>
            <ViewProduct />
            <Footer />
          </div>
        } />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/customer-dashboard" element={
          <div>
            <Cart />
            <CustomerDashboard />
          </div>
        } />
      </Routes>
    </>
  );
}

export default App;
