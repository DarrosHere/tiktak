import React, { useState, useEffect, useRef } from "react";
import VideoBlock from "./video-block";
import videos from "./videos";

function VideoList() {
  const [likes, setLikes] = useState({ owls: 0, dogs: 0, cats: 0 });
  const [current, setCurrent] = useState(0);
  const lastScroll = useRef(0);

  const getWeightedCategories = () => {
    const weighted = [];
    for (const category in likes) {
      weighted.push(...Array(likes[category] + 1).fill(category));
    }
    return weighted;
  };

  const getChances = () => {
    const weighted = getWeightedCategories();
    const total = weighted.length;
    const chances = {};
    for (const category in likes) {
      const count = weighted.filter((c) => c === category).length;
      chances[category] = ((count / total) * 100).toFixed(0);
    }
    return chances;
  };

  const goToNextVideo = () => {
    const weighted = getWeightedCategories();
    const randomCategory = weighted[Math.floor(Math.random() * weighted.length)];
    const categoryVideos = videos.filter((v) => v.category === randomCategory);
    const randomVideo = categoryVideos[Math.floor(Math.random() * categoryVideos.length)];
    setCurrent(videos.indexOf(randomVideo));
  };

  const handleLike = () => {
    const category = videos[current].category;
    setLikes((prev) => ({ ...prev, [category]: prev[category] + 1 }));
    goToNextVideo();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") goToNextVideo();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
  }, []);

  console.log("Likes:", likes);
  console.log("Chances:", getChances());

  return (
    <div className="video-list">
      <VideoBlock video={videos[current]} onLike={handleLike} />
      <div className="text-gray-400 text-sm text-center">
        Press <b>Down Arrow</b> or <b>scroll down</b> for the next video
      </div>
    </div>
  );
}

export default VideoList;
