import { useState } from "react";
import { useGetAllUsersQuery } from "../features/auth/api.js"; // RTK Query hook

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: users = [], isLoading, isError } = useGetAllUsersQuery();

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <div className="flex h-screen text-white bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-[rgba(15,15,35,0.8)] backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-white/10 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Whispyr
          </h1>
          <button
            className="md:hidden text-white/60 hover:text-indigo-400"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Users List */}
        <div className="overflow-y-auto">
          {isLoading ? (
            <p className="text-center text-white/60 p-4">Loading users...</p>
          ) : isError ? (
            <p className="text-center text-red-400 p-4">Failed to load users</p>
          ) : users.length === 0 ? (
            <p className="text-center text-white/60 p-4">No users found</p>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                className="flex items-center p-4 cursor-pointer hover:bg-white/5 transition"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg mr-3 bg-gradient-to-br from-indigo-400 to-purple-500 relative">
                  {user.fullName
                    ? user.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "?"}
                  <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0f0f23]"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm">{user.fullName}</h4>
                  <p className="text-xs text-white/60 truncate">
                    {user.lastMessage || "Hey there! How’s everything?"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Chat */}
      <main className="flex-1 flex flex-col bg-[rgba(26,26,46,0.6)] backdrop-blur-xl">
        {/* Header */}
        <header className="p-5 flex justify-between items-center bg-[rgba(15,15,35,0.8)] border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-white/60 hover:text-indigo-400"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center font-semibold relative">
              VT
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-[#0f0f23] rounded-full"></span>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Vansh Talwar</h3>
              <p className="text-xs text-green-400">Online</p>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] sm:max-w-[70%] p-3 rounded-2xl text-sm ${
                  msg.sender === "me"
                    ? "bg-gradient-to-br from-indigo-400 to-purple-500 rounded-br-md shadow-[0_4px_20px_rgba(102,126,234,0.3)]"
                    : "bg-white/10 border border-white/10 rounded-bl-md"
                }`}
              >
                <p>{msg.text}</p>
                <p
                  className={`text-[10px] mt-1 ${
                    msg.sender === "me" ? "text-white/70 text-right" : "text-white/50"
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <footer className="p-4 sm:p-5 bg-[rgba(15,15,35,0.8)] border-t border-white/10">
          <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 focus-within:border-indigo-400 transition">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none px-3 text-sm text-white placeholder:text-white/50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="ml-2 sm:ml-3 w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center hover:scale-105 hover:shadow-[0_4px_20px_rgba(102,126,234,0.4)] transition"
            >
              ➤
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
