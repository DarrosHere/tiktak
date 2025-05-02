import React, { useState } from "react";

function Login({ setUser, setShowRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      const profile = await fetch("http://localhost:5000/auth/profile", {
        headers: { Authorization: "Bearer " + data.token },
      });
      const user = await profile.json();
      setUser(user);
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="bg-[#181818] rounded-xl shadow-lg w-full max-w-sm p-0 relative border border-[#232323]">
        <button
          className="absolute right-4 top-4 text-gray-400 hover:text-white text-2xl"
          onClick={() => setUser(null)}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-3xl font-bold text-white text-center mt-10 mb-8">Log in</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4 px-8">
          <label className="text-xs text-gray-400 mb-1 text-left">Email or Username</label>
          <input
            className="bg-[#232323] text-white rounded px-4 py-3 border-none outline-none placeholder-gray-500 text-base"
            placeholder="Email or Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoFocus
          />
          <label className="text-xs text-gray-400 mb-1 text-left">Password</label>
          <input
            className="bg-[#232323] text-white rounded px-4 py-3 border-none outline-none placeholder-gray-500 text-base"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            className="mt-4 bg-[#fe2c55] hover:bg-[#e41e48] text-white font-semibold py-3 rounded-lg text-lg transition disabled:opacity-60"
            type="submit"
          >
            Log in
          </button>
          {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        </form>
        <div className="border-t border-[#232323] mt-8"></div>
        <div className="w-full text-center py-6 text-gray-400 text-base bg-[#181818] rounded-b-xl">
          Don’t have an account?{" "}
          <button
  className="text-[#fe2c55] hover:underline font-semibold"
  onClick={() => setShowRegister(true)}
>
  Sign up
</button>
        </div>
      </div>
    </div>
  );
}

export default Login;