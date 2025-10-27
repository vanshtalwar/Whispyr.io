import express, { Router } from 'express'
import { checkAuth, getAllUsers, login,logout,signup, updateProfile } from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post("/signup",signup)


router.post("/login",login)


router.post("/logout",logout)

router.put("/update-profile",protectRoute, updateProfile)

router.get("/check",protectRoute, checkAuth)

router.get("/users", getAllUsers);


export default router