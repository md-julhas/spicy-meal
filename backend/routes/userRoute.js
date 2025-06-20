import express from "express"
import rateLimit from "express-rate-limit"
import upload from "../utils/upload.js"
const userRouter = express.Router()

import {
  adminLoginUser,
  handleGetUser,
  handleGetUserBasic,
  handleGetUsersList,
  loginUser,
  registerUser,
} from "../controllers/userController.js"
import authMiddleware from "../middleware/auth.js"

// Strict limiter for user creation (very low limit)
const createUserLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message:
    "Too many account creation requests from this IP. Please try again after 15 minutes.",
})

userRouter.post(
  "/register",
  createUserLimiter,
  upload.single("image"),
  registerUser
)
userRouter.post("/login", loginUser)
userRouter.get("/user-basic", authMiddleware, handleGetUserBasic)
userRouter.get("/user", authMiddleware, handleGetUser)
userRouter.get("/user-list", authMiddleware, handleGetUsersList)
userRouter.post("/admin-login", adminLoginUser)

export default userRouter
