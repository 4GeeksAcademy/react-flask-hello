import React from "react";

const colors = [
  "white",
  "black",
  "gray",
  "red",
  "brown",
  "orange",
  "yellow",
  "green",
  "mint",
  "aqua",
  "blue",
  "purple",
  
];

const shades = ["100", "300", "500", "700", "900"];

const ColorSwatch = ({ name, color }) => (
  <div className="mb-4 text-center">
    <div
      className="rounded shadow mb-2"
      style={{ backgroundColor: `var(--${color})`, height: "80px" }}
    ></div>
    <div className="text-muted small">{name}</div>
  </div>
);

const ColorPalettePreview = () => {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Color Palette Preview</h1>

      {/* Row for white and black */}
      <div className="row">
        {["white", "black"].map((color) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={color}>
            <ColorSwatch name={color} color={color} />
          </div>
        ))}
      </div>

      {/* Each color gets its own row */}
      {colors
        .filter((color) => color !== "white" && color !== "black")
        .map((color) => (
          <div key={color} className="mb-5">
            <h5 className="text-capitalize mb-3">{color}</h5>
            <div className="row">
              {shades.map((shade) => (
                <div
                  className="col-6 col-sm-4 col-md-3 col-lg-2"
                  key={`${color}-${shade}`}
                >
                  <ColorSwatch
                    name={`${color}-${shade}`}
                    color={`${color}-${shade}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};


export default ColorPalettePreview;
