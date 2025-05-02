import React from "react";

function LeftBlock({ user, tab, setTab, onLogout }) {
  return (
    <div className="flex flex-col w-[340px] h-screen bg-black/80 rounded-2xl shadow-lg overflow-hidden p-6 space-y-2">
      <div className="text-2xl font-bold mb-6 text-white">TikTak</div>
      <nav className="flex flex-col space-y-2">
        <button
          className={`flex items-center space-x-3 py-2 px-3 rounded-lg ${
            tab === "videos" ? "text-pink-500 font-semibold bg-black" : "text-white hover:bg-gray-800 transition"
          }`}
          onClick={() => setTab("videos")}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 01.894.553l7 14A1 1 0 0117 18H3a1 1 0 01-.894-1.447l7-14A1 1 0 0110 2z" />
          </svg>
          <span>For You</span>
        </button>
        <button
          className={`flex items-center space-x-3 py-2 px-3 rounded-lg ${
            tab === "upload" ? "text-pink-500 font-semibold bg-black" : "text-white hover:bg-gray-800 transition"
          }`}
          onClick={() => setTab("upload")}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" rx="2"/>
            <path d="M8 12h8M12 8v8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Upload</span>
        </button>
        <button
          className={`flex items-center space-x-3 py-2 px-3 rounded-lg ${
            tab === "profile" ? "text-pink-500 font-semibold bg-black" : "text-white hover:bg-gray-800 transition"
          }`}
          onClick={() => setTab("profile")}
        >
          <svg className="w-6 h-6 rounded-full bg-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
          <span>Profile</span>
        </button>
        {!user && (
          <>
            <button
              className={`flex items-center space-x-3 py-2 px-3 rounded-lg ${
                tab === "login" ? "text-pink-500 font-semibold bg-black" : "text-white hover:bg-gray-800 transition"
              }`}
              onClick={() => setTab("login")}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
              <span>Login</span>
            </button>
            <button
              className={`flex items-center space-x-3 py-2 px-3 rounded-lg ${
                tab === "register" ? "text-pink-500 font-semibold bg-black" : "text-white hover:bg-gray-800 transition"
              }`}
              onClick={() => setTab("register")}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" rx="2"/>
                <path d="M8 12h8M12 8v8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Register</span>
            </button>
          </>
        )}
        {user && (
          <button
            className="flex items-center space-x-3 py-2 px-3 rounded-lg text-white hover:bg-gray-800 transition mt-8"
            onClick={onLogout}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 12a9 9 0 0118 0" />
            </svg>
            <span>Logout</span>
          </button>
        )}
      </nav>
    </div>
  );
}

export default LeftBlock;