import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import Logo from './Logo';


const Header = () => {
    const authStatus = useSelector((state) => state.auth.userStatus)
    const navigate = useNavigate();
    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Sign Up",
            slug: "/sign-up",
            active: !authStatus
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus
        }

    ]
    return (
        <div className='overflow-x-hidden p-2 bg-black/5 backdrop-blur-3xl  flex items-center justify-between '>
            <div><Logo /></div>
            <ul className='flex items-center '>
                {navItems.map((item) => {
                    return (
                        <li key={item.name} >
                            {item.active ?
                                <NavLink to={item.slug} className={({ isActive }) =>
                                    isActive
                                        ? "text-cyan-300 m-4  lg:text-2xl sm:text-[16px] sm:m-w-6  mask-r-from-cyan-400"
                                        : "text-gray-200 m-4 lg:text-2xl sm:text-[16px] sm:m-w-6 "
                                }>
                                    {item.name}

                                </NavLink> : null}
                        </li>
                    )
                })}
            </ul>

        </div>
    );
}

export default Header;
