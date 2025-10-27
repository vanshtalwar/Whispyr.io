import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from '../lib/utils.js'
import cloudinary from '../lib/cloudinary.js'


export const signup = async (req, res) => {
    const { email, password, fullName } = req.body
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "all fields are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 chatacters" })
        }

        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "Email already exists" })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        })

        if (newUser) {
            // generate jwt here
            generateToken(newUser._id, res)
            await newUser.save(

                res.status(201).json({
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    profilePic: newUser.profilePic,
                      message: "New account created successfully"
                })
            )
        }
        else {
            res.status(400).json({ message: "invalid user data" })
        }
    } catch (error) {
        console.log("error in signup controller", error)
        res.status(500).json({ message: "internal server error" })
    }

}


export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "Invalid Credentials" })
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials" })

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            message: "logged in successfully"
        })


    } catch (error) {
        console.log("error in login controller", error)
        res.status(500).json({ message: "internal server error" })
    }
}


export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logout Successfully" })

    } catch (error) {
        console.log("error in logout controller", error)
        res.status(500).json({ message: "internal server error" })
    }

}

export const updateProfile = async (req, res) => {
try {
    const {profilePic} = req.body
    const userId = req.user._id

    if (!profilePic) {
        return res.status(400).json({message: "Profile pic is required"})
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updateUser = await User.findByIdAndUpdate(
        userId,
        {profilePic: uploadResponse.secure_url},
        {new : true}
    )
res.status(200).json(updateUser)

} catch (error) {
   console.log("error in update profile", error)
        res.status(500).json({ message: "internal server error" }) 
}
}

export const checkAuth = (req, res) => {
try {
    res.status(200).json(req.user)
} catch (error) {
    console.log("error in checkAuth controller", error)
        res.status(500).json({ message: "internal server error" })
}
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // exclude passwords
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
