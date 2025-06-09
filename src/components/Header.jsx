import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { Logout, Logo } from "./import.js";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.userStatus);
  const states = useSelector((state) => state.auth.userData);
  console.log(states);

  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Sign Up",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <div className="overflow-x-hidden p-2 bg-white/1 backdrop-blur-[8px]  flex items-center justify-between sticky top-0 w-full z-10 ">
      <div>
        <Logo />
      </div>
      <ul className="flex items-center text-center justify-center  ">
        {navItems.map((item) => {
          return (
            <li key={item.name} className="flex items-center">
              {item.active ? (
                <NavLink
                  to={item.slug}
                  className={({ isActive }) =>
                    isActive
                      ? "text-cyan-300 m-4  lg:text-[20px] sm:text-[15px] sm:m-w-6  mask-b-from-1.5"
                      : "text-gray-200 m-4 lg:text-[20px] sm:text-[15px] sm:m-w-6 "
                  }
                >
                  {item.name}
                </NavLink>
              ) : null}
            </li>
          );
        })}
        {authStatus && <Logout />}
      </ul>
    </div>
  );
};

export default Header;
