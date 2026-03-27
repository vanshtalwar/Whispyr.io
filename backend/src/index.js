import express from "express"
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import dotenv from "dotenv"
import {connectDB}  from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors";

dotenv.config()

const app = express()

app.use(
  cors({
    origin: ["https://whispyr-io.vercel.app"],
    credentials: true,
  })
);


app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("Server is running on PORT : " + PORT);
    connectDB()
})