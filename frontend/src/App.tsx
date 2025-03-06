import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./components/Cart.tsx"
import SignUp from "./components/SignUp.tsx";
 import Login from "./components/Login.tsx";
// import Footer from "./components/Footer.tsx";
import CustomerDashboard from "./components/dashboard/CustomerDashBoard.tsx";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />
      <Routes>
         <Route path="/" element={<div><SignUp />
          <Cart/>
         </div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer-dashboard" element={<div>
          <CustomerDashboard />
          <Cart/>
          </div>} /> 
       {/* //<Route path="/"  element={ <Cart/>} /> */}
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
