import mongoose from "mongoose";

const billingSchema = new mongoose.Schema(
  {
   userId: {
    tupe: mongoose.Schema.Types.ObjectId,
    ref: "User",
   },
   amount: Number,
   plan: string,
   paymentId: String,
   orderId: String,

   status:{
    type: String,
    enum: ["created", "paid", "failed"],
    default: "created",
   },
  },{timestamps: true}
)

const Billing = mongoose.model("Billing", billingSchema);
export default Billing;