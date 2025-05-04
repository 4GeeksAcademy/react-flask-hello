import { useEffect } from "react";
import videojs from "cloudinary-video-player";
import "cloudinary-video-player/dist/cld-video-player.min.css";

const CloudinaryPlayer = ({ publicId }) => {
  useEffect(() => {
    const cld = window.cloudinary.Cloudinary.new({ cloud_name: "dgknhbs4e" });

    const player = cld.videoPlayer("cld-video", {
      controls: true,
      autoplay: false,
      width: 640,
      height: 360,
    });

    player.source(publicId);
  }, [publicId]);

  return <video id="cld-video" />;
};

export default CloudinaryPlayer;
