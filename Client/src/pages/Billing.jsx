import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tost from "react-hot-toast";
import axios from "axios";
import { ServerUrl } from "../App.jsx";
import { motion } from "framer-motion";
function Billing({ user, setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.isSetupComplete) {
      tost.error("Please setup your assistant first");
      navigate("/builder");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const remainingMessages = Math.max(
    0,
    (user?.requestLimit || 0) - (user?.totalMessages || 0),
  );

  const remaininDays = user?.proExpiresAt
    ? Math.max(
        0,
        Math.ceil(
          (new Date(user.proExpiresAt) - new Date()) / (1000 * 60 * 60 * 24),
        ),
      )
    : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // eslint-disable-next-line no-unused-vars
  const handlePay = async () => {
    try {
      const res = await axios.post(
        ServerUrl + "/api/billing/order",
        { plan: "pro" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const order = res.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Speakly",
        description: "Pro Plan",
        order_id: order.id,

        handler: async function (response) {
          const verifyRes = await axios.post(
            ServerUrl + "/api/billing/verify",
            response,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );
          if (verifyRes.data.success) {
            tost.success("Payment successful");
            setUser(verifyRes.data.user);
          }
        },
        theme: {
          color: "#7c3aed",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      tost.error("Payment failed. Please try again.");
      console.log(err);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#f7f8fc] px-4 py-10"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className=" text-3xl font-bold text-[#081028]">
            Billing & Subscription
          </h2>
          <p className="text-gray-500 mt-1">
            Manage your AI Assistant plan and usage.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              label: "Current Plan",
              value: user.plan,
              color: "text-[#081028]",
            },
            {
              label: "Gemini Status",
              value: user.geminiStatus,
              color:
                user?.geminiStatus === "active"
                  ? "text-emerald-600"
                  : user?.geminiStatus === "invalid"
                    ? "text-red-500"
                    : "text-amber-500",
            },
            {
              label: user?.plan === "free" ? "Messages Left" : "Plan Expiry",
              value:
                user?.plan === "free"
                  ? remainingMessages
                  : `${remaininDays} days left`,
              color: "text-[#081028]",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="rounded-3xl p-6 border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-sm text-gray-400 px-2 pt-1">{item.label}</p>
              <h2
                className={` text-xl font-bold mt-1 px-2 pb-1 capitalize ${item.color}`}
              >
                {item.value}
              </h2>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* free */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-bold text-[#081028]">Free Plan</h2>
            <h3 className="text-5xl font-bold mt-5 text-[#081028]">₹0</h3>

            <motion.ul
              className="mt-6 space-y-4 text-gray-600"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                "200 AI messages",
                "Voice assistant",
                "Navigation support",
                "Basic customization",
              ].map((feature, idx) => (
                <motion.li
                  key={idx}
                  variants={itemVariants}
                  className="flex items-center gap-2"
                >
                  <span className="text-green-500 font-bold">✓</span> {feature}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          {/* pro */}
          <motion.div
            variants={itemVariants}
            className="rounded-3xl p-8 bg-linear-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-2xl transition-shadow"
          >
            <h2 className="text-2xl font-bold">Pro Plan</h2>
            <h3 className="text-5xl font-bold mt-5">₹199</h3>
            <p className="mt-2 opacity-80">3 Months Access</p>
            <motion.ul
              className="mt-6 space-y-4 opacity-90"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                "Unlimited AI messages",
                "Advanced AI assistant",
                "Priority performance",
                "Unlimited navigation",
                "Premium support",
              ].map((feature, idx) => (
                <motion.li
                  key={idx}
                  variants={itemVariants}
                  className="flex items-center gap-2"
                >
                  <span className="font-bold">✓</span> {feature}
                </motion.li>
              ))}
            </motion.ul>

            <motion.button
              whileHover={!user?.plan === "pro" ? { scale: 1.05 } : {}}
              whileTap={!user?.plan === "pro" ? { scale: 0.95 } : {}}
              disabled={user?.plan === "pro"}
              className={`mt-8 h-14 w-full rounded-2xl font-semibold transition ${
                user?.plan === "pro"
                  ? "bg-emerald-200 text-black cursor-default"
                  : "bg-white text-[#081028] cursor-pointer hover:shadow-lg"
              }`}
            >
              Coming soon
              {/* {user?.plan === "pro" ? "Active Plan" : "Upgrade to Pro"} */}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
export default Billing;
