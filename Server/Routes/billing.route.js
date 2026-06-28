import express from "express"
import { createOrder, varifybilling } from "../Controllers/billing.controller.js"
import { isAuth } from "../Middleware/isAuth.js"

const billingRouter = express.Router()

billingRouter.post("/order", isAuth, createOrder)
billingRouter.post("/verify", isAuth, varifybilling)

export default billingRouter

