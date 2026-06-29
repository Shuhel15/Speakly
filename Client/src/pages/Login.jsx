import { motion } from "motion/react";
import {
  HiOutlineCodeBracket,
  HiOutlineMicrophone,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { FaBolt } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/logo.png";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase.js";
import axios from "axios";
import { ServerUrl } from "../App.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AboutSection from "../Components/AboutSection.jsx";
import FeaturesSection from "../Components/FeaturesSection.jsx";
import Footer from "../Components/Footer.jsx";
function Login({ setUser }) {
  const navigate = useNavigate();
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };
  const FEATURES = [
    {
      icon: <HiOutlineMicrophone />,
      title: "Voice AI",
      desc: "Natural real-time voice conversations.",
    },
    {
      icon: <HiOutlineSparkles />,
      title: "Smart Navigation",
      desc: "Navigate pages using voice commands.",
    },
    {
      icon: <HiOutlineMicrophone />,
      title: "Voice AI",
      desc: "Natural real-time voice conversations.",
    },
    {
      icon: <HiOutlineCodeBracket />,
      title: "Easy Embedding",
      desc: "Add assistant using one script tag.",
    },
    {
      icon: <FaBolt />,
      title: "Fast Response",
      desc: "Optimized Gemini AI responses.",
    },
  ];

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email } = result.user;

      const res = await axios.post(ServerUrl + "/api/auth/google", {
        name: displayName,
        email,
      });

      localStorage.setItem("token", res.data.token);

      setUser(res.data.user);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error("Login failed");
      console.log("Login error:", error);
    }
  };
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:px-6  lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* left */}
          <div>
            <motion.div
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-60 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-200 bg-green-100
          text-green-400 text-sm  font-bold"
            >
              <HiOutlineSparkles />
              AI Voice Assistant Platform
            </motion.div>
            <motion.h1
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-8 text-5xl lg:text-7xl font-black leading-tight text-[#081028]"
            >
              Build AI Assistants
              <span
                className="block text-transparent bg-clip-text
            bg-linear-to-r from-green-400 to-green-600"
              >
                For Any Website
              </span>
            </motion.h1>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="mt-6 text-lg text-gray-600"
            >
              <motion.p variants={item}>
                Create customizable AI voice assistants that talk,
              </motion.p>

              <motion.p variants={item}>
                guide users, and answer questions on your website.
              </motion.p>

              <motion.p variants={item}>
                Enhance user engagement and provide instant support.
              </motion.p>
              <motion.button
                onClick={handleLogin}
                variants={item}
                whileHover={{
                  scale: 1.01,
                  y: -4,
                }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 inline-flex items-center gap-2 px-6 
                py-3 rounded-full bg-green-500 text-white 
                font-semibold hover:bg-green-600"
              >
                <FcGoogle className="text-2xl bg-white rounded-full" />
                Continue with Google
              </motion.button>
              <motion.p variants={item} className="mt-6 text-sm text-gray-500">
                Free plan includes 200 AI responses
              </motion.p>
            </motion.div>
          </div>

          {/* right */}
          <motion.div
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 w-full h-full bg-linear-to-r from-green-400 to-green-600 rounded-lg blur-lg opacity-30 -z-10" />

            <div className="relative rounded-[40px] border border-black/5 bg-white shadow-[0_15px_70px_rgba(0,0,0,0.06)] p-5 overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="mt-1 text-3xl font-bold text-[#081028]">
                    Features
                  </h2>
                </div>

                <div className="w-16 h-16 rounded-3xl bg-green-100 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.15)] ">
                  <img
                    src={logo}
                    alt="logo"
                    className="w-full h-full object-contain "
                  />
                </div>
              </div>
              <div className="mt-6 space-y-5">
                {FEATURES.map(({ icon, title, desc }, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4
                    rounded-3xl  bg-gray-50 p-4"
                  >
                    <div
                      className="min-w-12 h-12 rounded-2xl bg-green-100
                      text-black font-bold flex items-center justify-center  text-2xl
                      shadow-[0_10px_40px_rgba(0,0,0,0.15)]"
                    >
                      {icon}
                    </div>
                    <div>
                      <h3 className="text-[#081028] font-bold text-lg">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-[#64748b]">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <AboutSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}

export default Login;
