import { useState, useEffect } from "react";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cart from '../Cart.tsx';
import Category from "../Category.tsx";
import { User } from "lucide-react"; // You can replace this with another icon library

const CustomerDashBoard = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [logoutApiCall] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Check if user is logged in by accessing the Redux store
    const userInfo = useSelector((state: any) => state.auth.userInfo);

    const handleLogout = async () => {
        try {
            // Make API call to logout if applicable
            await logoutApiCall().unwrap();
            dispatch(logout()); // Dispatch logout action to clear state
            localStorage.removeItem('userInfo'); // Remove user info from localStorage
            localStorage.removeItem('authToken'); // Remove auth token if necessary
            navigate("/login"); // Redirect to login page after logout
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // If no userInfo exists, navigate the user to login page immediately (page protection)
    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        }
    }, [userInfo, navigate]);

    return (
        <div className="relative p-4">
            <div className="flex justify-between items-center">
            
                <Category />
                <div className="relative">
                    <button 
                        onClick={() => setShowMenu(!showMenu)} 
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                        <User size={24} />
                    </button>
                    {showMenu && (
                        <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg w-40">
                            <button 
                                onClick={handleLogout} 
                                className="w-full text-left p-2 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Cart />
        </div>
    );
};

export default CustomerDashBoard;
