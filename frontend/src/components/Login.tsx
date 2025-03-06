import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../slices/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state: any) => state.auth);

  useEffect(() => {
   
    if (user) {
      navigate("/customer-dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        toast.success("Login successful!", { position: "top-right" });
        navigate("/customer-dashboard");
      })
      .catch((err) => {
        
        const errorMessage = err?.response?.data?.message || err?.message || "Invalid email or password.";
        toast.error(errorMessage, { position: "top-right" });
      });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black bg-opacity-70">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="block w-full p-2 border border-gray-300 rounded-lg"
            required
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="block w-full p-2 border border-gray-300 rounded-lg"
            required
            disabled={loading}
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
