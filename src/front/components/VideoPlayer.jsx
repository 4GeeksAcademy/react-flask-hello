import React from "react";

const VideoPlayer =()=>{
    const videoSrc= "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    return(
        <div className="max-w-2x1 mx-auto"> 
        <video className="w-full h-auto rounded-lg shadow-lg" src={videoSrc} controls preload="metadata">Parece que tu navegador no puedo reproducir archivos de tipo video</video>
        </div>

    )
}
export default VideoPlayer;