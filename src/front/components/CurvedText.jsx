import React from "react";

const CurvedText = ({ text, direction = "up" }) => {
  const pathId = direction === "up" ? "curveUp" : "curveDown";
  const pathD =
    direction === "up"
      ? "M 50 80 Q 250 0 450 80"
      : "M 50 20 Q 250 100 450 20";

  const dominantBaseline = direction === "down" ? "text-after-edge" : "auto";

  return (
    <div className="text-center mb-3">
      <svg width="100%" height="100" viewBox="0 0 500 100">
        <defs>
          <path id={pathId} d={pathD} fill="transparent" />
        </defs>
        <text
          width="500"
          textAnchor="middle"
          dominantBaseline={dominantBaseline}
          style={{ fontSize: "24px", fill: "#3c6ca8", fontWeight: "600" }}
        >
          <textPath href={`#${pathId}`} startOffset="50%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CurvedText;
