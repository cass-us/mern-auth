import { useState, useEffect } from "react";
import { logout } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react"; // You can replace this with another icon library

const CustomerDashBoard = () => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Access the user information from the Redux store
    const userInfo = useSelector((state: any) => state.auth.user);

    // If no userInfo exists, navigate the user to login page immediately (page protection)
    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        }
    }, [userInfo, navigate]); // Only re-run if userInfo or navigate changes

    // Handle logout
    const handleLogout = () => {
        // Dispatch the logout action
        dispatch(logout());
        // Redirect the user to the login page after logging out
        navigate("/login");
    };

    return (
        <div className="relative p-4">
            <div className="flex justify-between items-center">
                <div className="relative">
                    <button 
                        onClick={() => setShowMenu(!showMenu)} 
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                        <User size={24} />
                    </button>
                    {showMenu && (
                        <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg w-40">
                            {/* Logout button */}
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
        </div>
    );
};

export default CustomerDashBoard;
