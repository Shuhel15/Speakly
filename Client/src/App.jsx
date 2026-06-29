import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ProtectedRoute from "./Components/ProtectedRoute";
import Navbar from "./Components/Navbar";
import Builder from "./pages/Builder";
import Billing from "./pages/Billing";
import { Toaster } from "react-hot-toast";
import Footer from "./Components/Footer";

export const ServerUrl = "https://speaklyaiserver.onrender.com";
export const CLIENT_URL = "https://speakly-ra3t.onrender.com";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchMe = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await axios.get(
        ServerUrl + "/api/user/current-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);
      setLoading(false);
    } catch (error) {
      console.log("FETCH USER ERROR");
      console.log(error?.response?.status);
      console.log(error?.response?.data);
      setLoading(false);
    }
  };

  fetchMe();
}, []);
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Navbar setUser={setUser} user={user} />
              <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route
                  path="/builder"
                  element={<Builder user={user} setUser={setUser} />}
                />
                <Route
                  path="/billing"
                  element={<Billing user={user} setUser={setUser} />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Footer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
