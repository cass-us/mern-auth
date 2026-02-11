import { useState, useEffect } from "react";
import { logout } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const CustomerDashBoard = () => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
   
    const userInfo = useSelector((state: any) => state.auth.user);

  
    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        }
    }, [userInfo, navigate]); 

   
    const handleLogout = () => {
       
        dispatch(logout());
      t
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
