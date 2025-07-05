import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { Logout, Logo } from "./import.js";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.userStatus);
  const states = useSelector((state) => state.auth.userData);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Sign Up", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <div className="p-2 px-[5%] bg-white/5 backdrop-blur-[8px] sticky top-0 w-full z-10">
      <div className="flex items-center justify-between">
        <div>
          <Logo />
        </div>

        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <ul className="hidden sm:flex items-center space-x-6  text-gray-200">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <NavLink
                  to={item.slug}
                  className={({ isActive }) =>
                    isActive
                      ? "text-cyan-300 text-lg"
                      : "text-gray-200 hover:text-cyan-200 text-lg"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ) : null
          )}
          {authStatus && <Logout />}
        </ul>
      </div>

      {isOpen && (
        <ul className="sm:hidden mt-4 flex flex-col gap-4 text-white">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <NavLink
                  to={item.slug}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-cyan-300 text-lg"
                      : "text-gray-200 hover:text-cyan-200 text-lg"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ) : null
          )}
          {authStatus && <Logout />}
        </ul>
      )}
    </div>
  );
};

export default Header;
