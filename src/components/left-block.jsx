import React from "react";

function LeftBlock() {
  return (
    <div className="flex flex-col w-[340px] h-screen bg-black/80 rounded-2xl shadow-lg overflow-hidden p-6 space-y-2">
      <div className="text-2xl font-bold mb-6 text-white">TikTak</div>
      <nav className="flex flex-col space-y-2">
        <button className="flex items-center space-x-3 py-2 px-3 rounded-lg text-pink-500 font-semibold bg-black">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 01.894.553l7 14A1 1 0 0117 18H3a1 1 0 01-.894-1.447l7-14A1 1 0 0110 2z" />
          </svg>
          <span>For You</span>
        </button>
        <button className="flex items-center space-x-3 py-2 px-3 rounded-lg text-white hover:bg-gray-800 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Explore</span>
        </button>
        <button className="flex items-center space-x-3 py-2 px-3 rounded-lg text-white hover:bg-gray-800 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="18" cy="8" r="3" />
            <circle cx="6" cy="8" r="3" />
            <circle cx="12" cy="16" r="3" />
            <path d="M8.59 13.51l2.83 2.83 2.83-2.83" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Following</span>
        </button>
        <button className="flex items-center space-x-3 py-2 px-3 rounded-lg text-white hover:bg-gray-800 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="7" r="4" />
            <path d="M5.5 21a7.5 7.5 0 0113 0" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Friends</span>
        </button>
        <button className="flex items-center space-x-3 py-2 px-3 rounded-lg text-white hover:bg-gray-800 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" rx="2"/>
            <path d="M8 12h8M12 8v8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Upload</span>
        </button>
        <button className="flex items-center space-x-3 py-2 px-3 rounded-lg text-white hover:bg-gray-800 transition relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v8z"/>
            <path d="M7 10h.01M12 10h.01M17 10h.01" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Activity</span>
          <span className="absolute right-3 top-2 bg-pink-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">1</span>
        </button>
        <button className="flex items-center space-x-3 py-2 px-3 rounded-lg text-white hover:bg-gray-800 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M8 6h8M8 10h8M8 14h8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>LIVE</span>
        </button>
        <button className="flex items-center space-x-3 py-2 px-3 rounded-lg text-white hover:bg-gray-800 transition">
          <svg className="w-6 h-6 rounded-full bg-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
          <span>Profile</span>
        </button>
        <button className="flex items-center space-x-3 py-2 px-3 rounded-lg text-white hover:bg-gray-800 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="1.5"/>
            <circle cx="19.5" cy="12" r="1.5"/>
            <circle cx="4.5" cy="12" r="1.5"/>
          </svg>
          <span>More</span>
        </button>
      </nav>
    </div>
  );
}

export default LeftBlock;