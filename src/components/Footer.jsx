import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import Logo from "./Logo";
import { FaX, FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="mt-20 p-6 w-full  bottom-0 text-gray-300 bg-gray-900 "
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
            <Logo/>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-xl">
          <a
            href="https://github.com/tanishs26/horizon"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://twitter.com/tanishs26"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://linkedin.com/in/tanishs26"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} Horizon. For educational purposes.
      </div>
    </motion.footer>
  );
};

export default Footer;
