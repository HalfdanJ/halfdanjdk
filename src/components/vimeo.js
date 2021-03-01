import React from "react";
const Vimeo = ({ videoId, videoTitle, ...props }) => (
  <div
    style={{
      position: "relative",
      paddingBottom: "56.25%",
      paddingTop: "30px",
      height: 0,
      overflow: "hidden",
    }}
  >
    <iframe
      title="video"
      src={`https://player.vimeo.com/video/${videoId}`}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
      }}
      frameBorder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);
export default Vimeo;
