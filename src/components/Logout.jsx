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
        <div className='flex text-white items-center px-6 py-2 rounded-md active:scale-90  cursor-pointer hover:bg-rose-600 duration-300' onClick={handleLogout}>
            <FaSignOutAlt/>
            <button type='button' className='cursor-pointer'>
                Sign Out
            </button>
        </div>


    );
}

export default Logout;
