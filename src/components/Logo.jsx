import React from "react";
import { motion } from "framer-motion";

const shimmer = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const Logo = ({ className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="cursor-pointer select-none "
    >
      <h1
        className={`  ${className} text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-extrabold tracking-wider italic bg-gradient-to-r from-gray-200 to-neutral-100 bg-[length:200%_200%] text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(0,255,255,0.25)] transition-all duration-500`}
      >
        Ho<span className="text-cyan-300 animate-pulse ">r</span>izon
      </h1>
      <p className="text-sm mt-1 text-center text-gray-300">Let's blog.</p>
    </motion.div>
  );
};

export default Logo;
