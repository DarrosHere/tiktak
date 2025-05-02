import React, { useState } from "react";

function UploadVideo({ user, onUpload }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [video, setVideo] = useState(null);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video) return;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("user_id", user.id);
    formData.append("video", video);

    const res = await fetch("http://localhost:5000/videos/upload", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      setMsg("Uploaded!");
      setTitle("");
      setCategory("");
      setVideo(null);
      if (onUpload) onUpload();
    } else {
      setMsg("Upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xs mx-auto mt-6 flex flex-col gap-3">
      <h2 className="text-lg font-bold text-center">Upload Video</h2>
      <input
        className="border p-2"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        className="border p-2"
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        required
      />
      <input
        className="border p-2"
        type="file"
        accept="video/*"
        onChange={e => setVideo(e.target.files[0])}
        required
      />
      <button className="bg-blue-500 text-white py-2 rounded" type="submit">
        Upload
      </button>
      {msg && <div className="text-center">{msg}</div>}
    </form>
  );
}

export default UploadVideo;