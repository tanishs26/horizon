import React from 'react';
import { motion } from 'framer-motion';

const shimmer = {
    animate: {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
        },
    },
};

const Logo = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="cursor-pointer select-none "
        >
            <motion.h1
                variants={shimmer}
                animate="animate"
                className=" sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wider italic bg-gradient-to-r from-cyan-300 to-cyan-300 bg-[length:200%_200%] text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(0,255,255,0.25)] transition-all duration-500"
            >
                Ho<span className="text-white animate-pulse">r</span>izon
            </motion.h1>
            <p className="text-sm mt-1 text-center text-gray-300">Reach beyond limits.</p>
        </motion.div>
    );
};

export default Logo;
