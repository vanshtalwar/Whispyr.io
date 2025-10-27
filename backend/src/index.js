import express from "express"
import authRoutes from '../src/routes/auth.route.js'
import messageRoutes from '../src/routes/message.route.js'
import dotenv from "dotenv"
import {connectDB}  from "../src/lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors";

import path from "path";

const __dirname = path.resolve();

const app = express()
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // allow cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ this line fixes your current error
  })
);
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
  
dotenv.config()
const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log("Server is running on PORT : " + PORT);
    connectDB()
} )