import React from "react";

const GradientSVG = (props: any) => {
  const { startColor, endColor, idCSS, rotation } = props;
  const gradientTransform = `rotate(${rotation})`;

  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient id={idCSS} gradientTransform={gradientTransform}>
          <stop offset="0%" stopColor={startColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default GradientSVG;
