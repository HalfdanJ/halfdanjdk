import React from "react";

const YouTube = ({ videoId, videoTitle, ...props }) => (
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
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      src={`https://www.youtube.com/embed/${videoId}`}
      frameBorder="0"
    />
  </div>
);
export default YouTube;
