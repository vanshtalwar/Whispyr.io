import React, { useState } from "react";
import { useLoginMutation } from "../features/auth/api";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/slice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(form).unwrap();
      dispatch(setCredentials(result));
      toast.success("Login successful!");
      navigate("/home");

    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password! ❌");
    }
  };

  const [message, setMessage] = useState(null);

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-400">
      {/* Background bubbles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute w-20 h-20 bg-white/10 rounded-full top-[10%] left-[10%] animate-float" />
        <div className="absolute w-32 h-32 bg-white/10 rounded-full top-[20%] right-[15%] animate-float delay-200" />
        <div className="absolute w-16 h-16 bg-white/10 rounded-full bottom-[20%] left-[20%] animate-float delay-400" />
        <div className="absolute w-24 h-24 bg-white/10 rounded-full bottom-[15%] right-[10%] animate-float delay-100" />
        <span className="absolute text-white/10 text-4xl top-[15%] left-[80%] animate-pulse">💬</span>
        <span className="absolute text-white/10 text-4xl bottom-[25%] left-[5%] animate-pulse delay-500">💭</span>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md m-6 p-10 overflow-y-hidden bg-white/10 border border-white/20 rounded-3xl backdrop-blur-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">Welcome Back To <span className="text-violet-300">Whispyr</span> </h1>
          <p className="text-white/80 mt-1 text-sm">Login to continue chatting on Whispyr</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full px-12 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 backdrop-blur-md"
            />
            <svg
              className="absolute left-4 top-3.5 w-5 h-5 text-white/60"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 
              18c0 1.1.9 2 2 2h16c1.1 0 
              2-.9 2-2V6c0-1.1-.9-2-2-2zm0 
              4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-12 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 backdrop-blur-md"
            />
            <svg
              className="absolute left-4 top-3.5 w-5 h-5 text-white/60"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 
              3.24 7 6v2H6c-1.1 0-2 .9-2 
              2v10c0 1.1.9 2 2 2h12c1.1 
              0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 
              9c-1.1 0-2-.9-2-2s.9-2 
              2-2 2 .9 2 2-.9 2-2 
              2zm3.1-9H8.9V6c0-1.71 
              1.39-3.1 3.1-3.1 1.71 0 
              3.1 1.39 3.1 3.1v2z" />
            </svg>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 font-semibold text-white rounded-xl bg-gradient-to-r from-cyan-400 to-violet-600 hover:scale-[1.02] transition-transform shadow-lg"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-white/80 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-cyan-400 hover:text-white transition">
            Sign up
          </Link>
        </p>
      </div>

      {/* Toast Notification */}
      {message && (
        <div
          className={`fixed top-5 right-5 px-5 py-3 rounded-lg text-white shadow-lg backdrop-blur-md transform transition-all ${message.type === "error"
            ? "bg-red-500/80"
            : message.type === "success"
              ? "bg-green-500/80"
              : "bg-blue-500/80"
            }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default Login;
