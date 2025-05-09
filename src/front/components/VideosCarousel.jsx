// import React, { useRef } from "react";
// import "../assets/styles/videoscarousel.css";

// const videoUrls = [
//   "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1234567890/sample1.mp4",
//   "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1234567890/sample2.mp4",
//   "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1234567890/sample3.mp4",
//   "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1234567890/sample4.mp4",
//   "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1234567890/sample5.mp4",
// ];

// const SingleVideoRow = () => {
//   const scrollRef = useRef(null);

//   const scroll = (direction) => {
//     const container = scrollRef.current;
//     if (!container) return;
//     const scrollAmount = 260;

//     if (direction === "left") {
//       container.scrollLeft -= scrollAmount;
//     } else {
//       container.scrollLeft += scrollAmount;
//     }
//   };

//   return (
//     <div className="carousel-wrapper">
//       <h1>
//         Level<span style={{ color: "#FB645C" }}>UP</span>
//       </h1>
//       <div className="carousel-row">
//         <button className="arrow__btn" onClick={() => scroll("left")}>
//           ‹
//         </button>
//         <div className="carousel-track no-auto-scroll" ref={scrollRef}>
//           {videoUrls.map((url, idx) => (
//             <div key={idx} className="item">
//               <video
//                 src={url}
//                 controls
//                 width="240"
//                 height="140"
//                 style={{ borderRadius: "10px", objectFit: "cover" }}
//               />
//             </div>
//           ))}
//         </div>
//         <button className="arrow__btn" onClick={() => scroll("right")}>
//           ›
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SingleVideoRow;
