import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tost from "react-hot-toast";
import axios from "axios";
import { ServerUrl } from "../App.jsx";
function Billing({user, setUser}) {

  const navigate = useNavigate();

  useEffect(() => {
    if(user && !user.isSetupComplete){
      tost.error("Please setup your assistant first");
      navigate("/builder");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
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

    // eslint-disable-next-line no-unused-vars
    const handlePay = async () => {
      try{
        const res = await axios.post( ServerUrl + "/api/billing/order", {plan: "pro"}, {withCredentials: true});

        const order = res.data.order;

        const options = {
          key:import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: "Speakly",
          description: "Pro Plan",
          order_id: order.id,

          handler: async function (response) {
            const verifyRes = await axios.post(ServerUrl + "/api/billing/verify", response, {withCredentials: true});
            if(verifyRes.data.success){
              tost.success("Payment successful");
              setUser(verifyRes.data.user);
            }
          }, theme:{
            color: "#7c3aed",
          },
        }

        const razorpay = new window.Razorpay(options);
        razorpay.open()
    }catch(err){
      tost.error("Payment failed. Please try again.");
      console.log(err);
    }
  }
  return (
    <div className="min-h-screen bg-[#f7f8fc] px-4 py-10">
      <div className="max-w-5xl mx-auto">
         <div className="mb-8">
          <h2 className=" text-3xl font-bold text-[#081028]">
            Billing & Subscription
          </h2>
          <p className="text-gray-500 mt-1">Manage your AI Assistant plan and usage.</p>
        </div>
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="rounded-3xl p-6 border border-gray-100 bg-white shadow-sm">
                <p className="text-sm text-gray-400 px-2 pt-1">Current Plan</p>
                <h2 className=" text-xl font-bold text-[#081028] mt-1 px-2 pb-1 capitalize">
                  {user.plan}
                </h2>
              </div>
              <div className="rounded-3xl  p-6 border border-gray-100 bg-white shadow-sm">
                <p className="text-sm text-gray-400 px-2 pt-1">Gemini Status</p>
                <h2
                  className={` text-xl font-bold mt-1 px-2 pb-1 capitalize
                  ${user?.geminiStatus === "active" ? "text-emerald-600" : user?.geminiStatus === "invalid" ? "text-red-500" : "text-amber-500"}`}
                >
                  {user.geminiStatus}
                </h2>
              </div>
              <div className="rounded-3xl  p-6 border border-gray-100 bg-white shadow-sm">
                <p className="text-sm text-gray-400 px-2 pt-1">
                  {user?.plan === "free" ? "Messages Left" : "Plan Expiry"}
                </p>
                <h2 className=" text-xl font-bold text-[#081028] mt-1 px-2 pb-1 capitalize">
                  {user?.plan === "free"
                    ? remainingMessages
                    : `${remaininDays} days left`}
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {/* free */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-[#081028]">Fee Plan</h2>
                <h3 className="text-5xl font-bold mt-5 text-[#081028]">₹0</h3>

                <ul className="mt-6 space-y-4 text-gray-600">
                  <li>200 AI messages</li>
                  <li>Voice assistant</li>
                  <li>Navigation support</li>
                  <li>Basic customization</li>
                </ul>
              </div>
              {/* pro */}
              <div className="rounded-3xl p-8 bg-linear-to-r from-green-500 to bg-emerald-500 text-white shadwo-lg">
                <h2 className="text-2xl font-bold text-[#081028]">Pro Plan</h2>
                <h3 className="text-5xl font-bold mt-5 text-[#081028]">₹199</h3>
                <p className="mt-2 opacity-80">3 Months Access</p>
                <ul className="mt-6 space-y-4 opacity-90">
                  <li>Unlimited AI messages</li>
                  <li>Advanced AI assistant</li>
                  <li>Priority performance</li>
                  <li>Unlimited navigation</li>
                  <li>Premium support</li>
                </ul>

                <button 
                // onClick={handlePay}
                disabled={user?.plan === "pro"}
                className={`mt-8 h-14 w-full rounded-2xl font-semibold transition ${user?.plan === "pro"
                  ?"bg-emerald-200 text-black cursor-default"
                  :"bg-white text-[#081028] cursor-pointer"
                }`}>
                  Comming soon
                  {/* {user?.plan === "pro" ? "Active Plan" : "Upgrade to Pro"} */}
                </button>
              </div>
            </div>
      </div>
    </div>
  )
}
export default Billing
