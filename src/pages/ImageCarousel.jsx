import { div } from "framer-motion/m";
import { Container } from "../components/import.js";
import React, { useEffect, useState } from "react";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-164 sm:h-180 md:h-196 flex items-center justify-center bg-gray-800 rounded-2xl">
        <p className="text-white text-lg">No images available</p>
      </div>
    );
  }

  return (
      <div className=" max-w-full  h-164 sm:h-180 overflow-hidden rounded-2xl mb-8 ">
        <div
          className=" flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="min-w-full h-164 sm:h-180 md:h-196">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-fit"
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-amber-500 scale-125"
                  : "bg-gray-400 hover:bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
  );
};

export default ImageCarousel;
