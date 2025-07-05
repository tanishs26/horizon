import React, { useEffect, useState, useRef } from "react";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [currentX, setCurrentX] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleDragStart = (x) => {
    setIsDragging(true);
    setStartX(x);
    setCurrentX(x);
  };

  const handleDragMove = (x) => {
    if (!isDragging) return;
    setCurrentX(x);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    const delta = startX - currentX;
    if (Math.abs(delta) > 50) {
      delta > 0 ? nextSlide() : prevSlide();
    }
    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-164 sm:h-180 md:h-196 flex items-center justify-center bg-gray-800 rounded-2xl">
        <p className="text-white text-lg">No images available</p>
      </div>
    );
  }

  return (
    <div
      className="relative max-w-full h-164 sm:h-180 overflow-hidden rounded-2xl mb-8"
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      style={{ userSelect: "none", touchAction: "pan-y" }}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full h-164 sm:h-180 md:h-196">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 cursor-pointer transform -translate-y-1/2 bg-gray-900/50 text-white p-2 rounded-full hover:bg-gray-900/70 transition-all duration-200"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-900/50 text-white p-2 rounded-full hover:bg-gray-900/70 transition-all duration-200"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default ImageCarousel;
