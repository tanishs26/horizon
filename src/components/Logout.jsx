import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabase-client';
import { signOut } from "../store/authReducer"
const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        supabase.logOut().then(() => {
            dispatch(signOut())
            navigate('/')
        })
    }
    return (
        <div className='flex text-[20px] text-red-500 items-center px-4 py-2 rounded-md active:scale-90  cursor-pointer hover:bg-red-500  hover:text-white  duration-300' onClick={handleLogout}>
            <FaSignOutAlt className='mr-1'/>
            <h1> </h1>         
            <button type='button' className='cursor-pointer'> Log out
            </button>
        </div>


    );
}

export default Logout;
