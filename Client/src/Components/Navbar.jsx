import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { FiLogIn, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import { ServerUrl } from "../App";
import { useState } from "react";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.log("Logout error:", error);
    }
  };
  return (
    <div
      className="sticky top-0 backdrop-blur-xl bg-white/80
    border-b border-gray-100 "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6  py-3 flex justify-between items-center ">
        <div onClick={() => navigate("/")} className="flex items-center gap-1">
          <img src="/logo.png" alt="logo" className="w-auto h-9 rounded-full" />
          <h1 className="text-xl font-bold text-black">
            Speakly<span className="text-green-500"> AI</span>
          </h1>
        </div>

        {user && (
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate("/builder")}
              className="px-4 py-2 rounded-xl bg-linear-to-r 
          from-green-400 to-green-600 text-white text-sm font-medium
          shadow-md hover:scale-[1.02] transition-all"
            >
              Builder
            </button>

            <button
              onClick={() => navigate("/billing")}
              className="px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-700
            text-sm font-medium hover:border-gray-400 hover:scale-[1.02] transition-all cursor-pointer
            shadow-md"
            >
              Billing
            </button>

            <div
              className="flex item-center px-3 py-2 gap-3
            rounded-2xl bg-white border border-gray-200 shadow-sm"
            >
              <div
                className="w-8 h-8 rounded-full bg-linear-to-r
              from-green-400 to-green-500 flex items-center
              justify-center shrink-0"
              >
                <span className="text-white text-sm font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>

              <div className="max-w-35">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-1 text-gray-400 hover:text-red-500
                transition-colors cursor-pointer"
              >
                <IoIosLogOut size={24} />
              </button>
            </div>
          </div>
        )}
        {user && (
          <button
            className="md:hidden text-gray-600 hover:text-green-500 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        )}
      </div>
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4">
            <div
              className="flex items-center gap-3 pv-4 border-b
            border-gray-100"
            >
              <div
                className="w-8 h-8 rounded-full bg-linear-to-r
              from-green-400 to-green-500 flex items-center
              justify-center shrink-0"
              >
                <span className="text-white text-sm font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>

              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-4">
              <button
                className="w-full py-2.5 rounded-xl bg-linear-to-r
              from-green-400 to-green-600 text-white text-sm font-medium
              shadow-md hover:scale-[1.02] transition-all"
                onClick={() => {
                  navigate("/builder");
                  setMenuOpen(false);
                }}
              >
                Builder
              </button>
              <button
                className="w-full py-2.5 rounded-xl border-gray-100 bg-white text-gray-700 text-sm font-medium
              shadow-md hover:scale-[1.02] transition-all"
                onClick={() => {
                  navigate("/billing");
                  setMenuOpen(false);
                }}
              >
                Billing
              </button>
            </div>
            <button
              className="w-full mt-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium
            shadow-md hover:scale-[1.02] hover:text-red-500 transition-all flex items-center justify-center gap-2"
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
            >
              <FiLogOut size={24} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
