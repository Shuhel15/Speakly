import { useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";
import AssistantPreview from "../Components/AssistantPreview";
import AboutSection from "../Components/AboutSection";
import FeaturesSection from "../Components/FeaturesSection";

function Home() {
  const navigate = useNavigate();

  const STEPS = [
    {
      step: "01",
      title: "Sign Up free",
      desc: "Continue with Google and create your assistant in minutes.",
    },
    {
      step: "02",
      title: "Customize your assistant",
      desc: "Set your assistant's name, voice, tone and theme to match your brand.",
    },
    {
      step: "03",
      title: "Train your assistant",
      desc: "Add business details and personalize responses.",
    },
    {
      step: "04",
      title: "Add your Gemini API key",
      desc: "Add your Gemini API key to enable your assistant to answer questions.",
    },
    {
      step: "05",
      title: "Embed your assistant",
      desc: "Copy the code snippet and paste it into your website's HTML.",
    },
  ];

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const stepContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const stepItem = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  return (
    <div className="min-h-screen bg-[#f8fafc] overflow-hidden">
      <motion.section
        variants={container}
        className="relative overflow-hidden px-4 sm:px-6
      lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-20"
      >
        <div
          className="absolute inset-0 bg-linear-to-br 
        from-green-50 via-white to-green-100"
        />
        <div
          className="absolute top-0 left-1/4 w-[320px] h-80
        bg-green-200/40 blur-3xl rounded-full"
        />
        <div
          className="absolute bottom-0 right-1/4 w-[320px] h-80
        bg-green-200/40 blur-3xl rounded-full"
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative max-w-6xl mx-auto"
        >
          <motion.div variants={item} className="flex justify-center">
            <span
              variants={item}
              className="inline-flex items-center gap-2 
            bg-white border border-green-100 shadow-sm text-green-600 text-xs
            sm:text-sm font-semibold px-4 py-2 rounded-full"
            >
              <span className="w-2 h-2 bg-emerald-400 animate-pulse rounded-full" />
              Voice AI for morden websites
            </span>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center mt-10 sm:mt-12"
          >
            <motion.h1
              variants={item}
              className="max-w-5xl mx-auto text-[42px] leading-13
            sm:text-6xl sm:leading-18 lg:text-7xl lg:leading-22 font-black 
            tracking-[-0.04em] text-[#081028]"
            >
              Add a{" "}
              <span className="inline-block px-2">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-500">
                  Virtual Assistant
                </span>
              </span>
              <br className="hidden sm:block" />
              to your website in{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-500">
                minutes
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="max-w-2xl mx-auto mt-7 text-sm sm:text-lg
            lg:text-xl text-[#64748b] leading-relaxed px-2"
            >
              Create a smart voice-enabled assistant that talks to visitors,
              answers questions, and guides them through your website.
            </motion.p>
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10"
            >
              <motion.button
                onClick={() => navigate("/builder")}
                whileHover={{
                  scale: 1.03,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
                className="text-white w-full sm:w-auto px-8 py-4 rounded-2xl bg-linear-to-r from-green-400 to-emerald-500 font-semibold text-sm sm:text-base shadow-[0_12px_40px_rgba(74,222,128,0.25)] flex items-center justify-center gap-2 cursor-pointer"
              >
                Build Your Assistant
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FiArrowUpRight />
                </motion.div>
              </motion.button>
            </motion.div>
            <motion.p
              variants={item}
              className="mt-5 text-xs sm:text-sm text-gray-400"
            >
              Free plan includes 200 AI responses
            </motion.p>
          </motion.div>
          <AssistantPreview />
        </motion.div>
      </motion.section>

      {/* steps section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#081028]">
              Get started in <span className="text-green-500">minutes</span>
            </h2>
            <p className="text-gray-500 mt-3 text-sm sm:text-base lg:text-lg">
              Simple setup. No complicated integration.
            </p>
          </motion.div>
          <motion.div
            variants={stepContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8"
          >
            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                variants={stepItem}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 18,
                }}
                className="group bg-[#f8fafc] hover:bg-white
            border border-gray-100 rounded-[28px] p-7 transition-all
            hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)]"
              >
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: i * 0.2,
                    duration: 0.4,
                  }}
                  className="text-4xl font-black text-transparent
              bg-clip-text bg-linear-to-r from-green-500 to-emerald-500"
                >
                  {s.step}
                </motion.span>

                <h3 className="mt-5 text-lg font-semibold text-[#081028]">
                  {s.title}
                </h3>

                <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AboutSection />

      <FeaturesSection />
    </div>
  );
}

export default Home;
