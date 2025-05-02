import React, { useState, useEffect } from "react";
import './App.css';
import './index.css';
import VideoList from './components/video-list';
import LeftBlock from './components/left-block';
import Login from './components/Login';
import Register from './components/Register';
import UploadVideo from './components/upload';

function App() {
  const [user, setUser] = useState(null); // test
  const [tab, setTab] = useState("videos");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/auth/profile", {
        headers: { Authorization: "Bearer " + token },  
      })
        .then(res => res.json())
        .then(data => {
          if (data && data.id) setUser(data);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setTab("login");
  };

  return (
    <div className="App min-h-screen flex flex-row bg-black">
      <div className="left-block w-[350px] h-full bg-black/80 text-white flex flex-col justify-between py-8 px-6 fixed top-0 left-0 z-10">
        <LeftBlock
          user={user}
          tab={tab}
          setTab={setTab}
          onLogout={handleLogout}
        />
      </div>
      <div className="flex-1 flex items-center justify-center ml-[350px]">
        {!user && tab === "login" && (
         <Login setUser={setUser} setShowRegister={() => setTab("register")} />
        )}
        {!user && tab === "register" && (
          <Register setShowLogin={() => setTab("login")} />
        )}
        {(user && tab === "videos") || (!user && tab === "videos") ? (
  <VideoList user={user} refresh={refresh} />
          ) : null}
        {user && tab === "upload" && (
          <UploadVideo user={user} onUpload={() => setRefresh(r => r + 1)} />
        )}
        {user && tab === "profile" && (
          <div className="text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <div>Username: {user.username}</div>
            <button
              className="mt-4 bg-red-500 px-4 py-2 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;