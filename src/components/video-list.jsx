import React, { useState, useEffect, useRef } from "react";
import VideoBlock from "./video-block";

function VideoList({ user, refresh }) {
  const [videos, setVideos] = useState([]);
  const [current, setCurrent] = useState(0);
  const [catPerc, setCatPerc] = useState(0);
  const [likedIds, setLikedIds] = useState([]);
  const lastScroll = useRef(0);




  useEffect(() => {
    fetch("http://localhost:5000/videos/all")
      .then(res => res.json())
      .then(data => setVideos(data));
  }, [refresh]);

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:5000/videos/likes/${user.id}`)
      .then(res => res.json())
      .then(likes => {


        const catCount = {};
        const ids = [];
        likes.forEach(like => {
          catCount[like.category] = (catCount[like.category] || 0) + 1;
          if (like.video_id) ids.push(like.video_id);
        });
        setLikedIds(ids); 
        setVideos(prev => {
          let weighted = [];
          prev.forEach(v => {
            const weight = 1 + (catCount[v.category] || 0);
            for (let i = 0; i < weight; i++) weighted.push(v);
          });
          return weighted;
        });
      });
  }, [user, refresh]);

  useEffect(() => {
    setCurrent(0);
  }, [videos]);

  useEffect(() => {
    if (videos.length === 0) return;
    const counts = {};
    videos.forEach(v => {
      const cat = v.category?.toLowerCase() || "";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    const currentCategory = videos[current]?.category?.toLowerCase() || "";
    const percent = currentCategory
      ? Math.round((counts[currentCategory] / videos.length) * 100)
      : 0;
    setCatPerc(percent);
    console.log(
      `Ймовірність показу відео з категорією "${currentCategory}": ${percent}%`
    );
  }, [videos, current]);

  const goToNextVideo = () => {
    if (videos.length === 0) return;
    setCurrent((prev) => (prev + 1) % videos.length);
  };

  const handleLike = async () => {
    if (!user || videos.length === 0) return;
    const video = videos[current];
    await fetch("http://localhost:5000/videos/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, video_id: video.id }),
    });
    
    window.location.reload();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") goToNextVideo();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [videos]);

  useEffect(() => {
    const handleWheel = (e) => {
      const now = Date.now();
      if (e.deltaY > 0 && now - lastScroll.current > 700) {
        goToNextVideo();
        lastScroll.current = now;
      }
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [videos]);

  return (
    <div className="video-list">
      {videos.length > 0 && (
        <>
          <VideoBlock
            video={videos[current]}
            onLike={user ? handleLike : null}
            user={user}
            liked={likedIds.includes(videos[current]?.id)} 
          />
          <div className="text-gray-400 text-sm text-center mb-2">
            Ймовірність показу цієї категорії: <b>{catPerc}%</b>
          </div>
        </>
      )}
      <div className="text-gray-400 text-sm text-center">
        Press <b>Down Arrow</b> or <b>scroll down</b> for the next video
      </div>
    </div>
  );
}

export default VideoList;