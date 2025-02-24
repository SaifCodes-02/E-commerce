import React, { useState } from "react";

const ImageMagnifier = ({ src, width, height, magnifierSize = 150, zoom = 2 }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div
      className="relative"
      style={{ width, height, overflow: "hidden", position: "relative", cursor: "none" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Main Image */}
      <img src={src} alt="Magnified" className="w-full h-full object-cover" />

      {/* Magnifier Effect */}
      {isHovered && (
        <div
          className="absolute rounded-full border-2 border-white shadow-lg"
          style={{
            width: `${magnifierSize}px`,
            height: `${magnifierSize}px`,
            backgroundImage: `url(${src})`,
            backgroundSize: `${width * zoom}px ${height * zoom}px`,
            backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
            transform: `translate(-50%, -50%)`,
            pointerEvents: "none",
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
          }}
        />
      )}
    </div>
  );
};

export default ImageMagnifier;
