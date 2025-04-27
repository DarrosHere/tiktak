import React, { useRef, useState, useEffect } from 'react';

function VideoBlock({ video, onLike }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);
//  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Autoplay failed:', err);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percent);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-end">

      <div className="relative bg-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col justify-end w-full md:w-[750px] h-screen cursor-pointer"
      onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <video
            ref={videoRef}
            src={video.url}
            className="absolute top-0 left-0 w-full h-full object-cover"
            playsInline
            loop
            muted
            autoPlay
            onTimeUpdate={handleTimeUpdate}
          />
  
          <div
            className="absolute bottom-0 left-0 w-full h-1 bg-gray-700 cursor-pointer"
          >
            <div
              className="h-full bg-pink-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
  
          {hovered && (
            <button
              onClick={togglePlay}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black/60 rounded-full p-4 hover:bg-black/80 transition"
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-5.197-3.02A1 1 0 008 9.02v5.958a1 1 0 001.555.832l5.197-3.02a1 1 0 000-1.664z" />
                </svg>
              )}
            </button>
          )}
  
          <div className="relative z-10 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <h2 className="text-white text-lg font-bold mb-2">{video.title}</h2>
            <p className="text-gray-200 text-sm mb-1">{video.description}</p>
            <p className="text-gray-400 text-xs mb-4">#{video.category}</p>
          </div>
        </div>
  
    
        <div className="flex flex-col items-center ml-6 mb-8">
          <button
            className="flex flex-col items-center text-white hover:text-pink-500 transition"
            onClick={() => {
   //           setLikes(likes + 1);
              onLike && onLike();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-8 h-8 mb-1" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            <span className="text-sm"></span>
          </button>
        </div>
      </div>
    </div>
  );
  
}

export default VideoBlock;
