import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewProduct from "./components/ViewProduct.tsx";
import Category from "./components/Category.tsx";
// Uncomment and import these when you're ready to use them:
// import Cart from "./components/Cart.tsx";
// import SignUp from "./components/SignUp.tsx";
// import Login from "./components/Login.tsx";
// import Footer from "./components/Footer.tsx";
// import Order from "./pages/Order.tsx";
// import CustomerDashboard from "./components/dashboard/CustomerDashBoard.tsx";

function App() {
  return (
    <>
      <ToastContainer 
        position="top-right" 
        autoClose={1000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route 
          path="/" 
          element={
            <div>
              <Category />
            </div>
          } 
        />
        <Route 
          path="/view-product/:id" 
          element={<ViewProduct />}
        />
        {/* Uncomment and add these routes when you're ready to use the components */}
        {/* 
        <Route path="/login" element={<Login />} />
        <Route 
          path="/customer-dashboard" 
          element={
            <div>
              <CustomerDashboard />
              <Cart />
            </div>
          } 
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        */}
      </Routes>
    </>
  );
}

export default App;