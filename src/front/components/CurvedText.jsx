import React from "react";

const CurvedText = () => {
    return (
        <div className="text-center mb-3">
            <svg width="100%" height="100" viewBox="0 0 500 100">
                <defs>
                    <path
                        id="curve"
                        d="M 50 80 Q 250 0 450 80"
                        fill="transparent"
                    />
                </defs>
                <text width="500" textAnchor="middle">
                    <textPath
                        href="#curve"
                        startOffset="50%"
                        style={{
                            fontSize: "24px",
                            fill: "#3c6ca8",
                            fontWeight: "600",
                        }}
                    >
                        Donde cada huellita cuenta...
                    </textPath>
                </text>
            </svg>
        </div>
    );
};

export default CurvedText;