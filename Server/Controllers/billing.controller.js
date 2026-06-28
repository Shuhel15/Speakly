// import { razorpay } from "../Configs/razorpay.js";
import Billing from "../Models/billing.model.js";
import crypto from "crypto";
export const createOrder = async (req, res) => {
  try {
    const { plan } = req.body;
    const userId = req.userId;
    let amount = 0;

    if (plan === "pro") {
      amount = 199;
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    await Billing.create({
      userId,
      amount,
      plan,
      orderId: order.id,
    })

    return res.json({
      success: true,
      message: "Order created successfully",
      order,
    })
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
}

export const varifybilling = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const userId = req.userId;

    const sign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");
    if (sign !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    await Billing.findOneAndUpdate(
      { orderId: razorpay_order_id },
      { paymentId: razorpay_payment_id, status: "success" }
    );

    const user = await User.findByIdAndUpdate(userId, {
      plan: "pro",
      proExpiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    },{new:true});

    return res.json({
      success: true,
      user,
      message: "Payment verified successfully",
    });
  } catch (error) { 
    console.error( error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify payment",
    });
  }
}