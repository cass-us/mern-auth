import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebook, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import backgroundImage from "./assets/background-1.jpg";
import emoji from "./assets/emoji.gif";

const SignUp = () => {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errorMessage, setErrorMessage] = useState("");  

    useEffect(() => {
       
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);  

        try {
            const response = await axios.post("http://localhost:5000/api/users", {
                name: formData.name,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
            });
            console.log(response.data);
            alert("Registration successful");
            setFormData({ name: "", lastName: "", email: "", password: "", confirmPassword: "" }); 
        } catch (error) {
            console.error("Error signing up:", error.response ? error.response.data : error.message);
            setErrorMessage(error.response ? error.response.data.message : "Error signing up, please try again later.");
        } finally {
            setLoading(false);  
        }
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-black">
                <img src={emoji} alt="Loading..." className="w-32 h-32" />
            </div>
        );
    }

    return (
        <div
            className="h-screen opacity-80 flex flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9 }}
                className="p-8 bg-black bg-opacity-80 h-[350px] w-[320px] rounded-4xl shadow-lg"
            >
                <form onSubmit={handleSubmit} className="space-y-2 text-center">
                    <h2 className="text-gray-300 font-bold p-2 text-xl">Register</h2>

                    
                    {errorMessage && (
                        <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
                    )}

                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        className="block w-full text-gray-600 bg-white p-2 rounded-lg"
                        required
                    />
                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        className="block w-full text-gray-600 bg-white p-2 rounded-lg"
                        required
                    />
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="block w-full text-gray-600 bg-white p-2 rounded-lg"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="block w-full text-gray-600 bg-white p-2 rounded-lg"
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        className="block w-full text-gray-600 bg-white p-2 rounded-lg"
                        required
                    />
                    <button
                        type="submit"
                        className="p-2 w-full bg-orange-800 text-white rounded-lg hover:bg-orange-700 transition duration-300"
                    >
                        Register
                    </button>
                </form>

                <div className="text-center bg-gray-300 h-[120px] p-2 mt-4 rounded-2xl shadow-md">
                    <ul className="flex justify-center space-x-4 mt-2 text-xs underline text-gray-700">
                        <li><a href="#">Forgot Password?</a></li>
                        <li><Link to="/login">Login?</Link></li>
                    </ul>
                    <div className="flex justify-center space-x-6 mt-4">
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                            <FaGoogle className="text-white text-2xl cursor-pointer hover:scale-110 transition" />
                        </div>
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <FaFacebook className="text-white text-2xl cursor-pointer hover:scale-110 transition" />
                        </div>
                        <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                            <FaInstagram className="text-white text-2xl cursor-pointer hover:scale-110 transition" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUp;
