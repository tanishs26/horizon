import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const AuthLayout = ({ children, authentication = true }) => {
    const authStatus = useSelector((state) => state.auth.userStatus)
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        if (authentication && !authStatus) {
            navigate('/login')
        }
        else if (!authentication && authStatus) {
            navigate('/')
        }
        setLoader(false)
    }, [])
    return (
        <div>
            {loader
                ? (<h1 className="text-2xl mx-auto text-center" > Please wait<BeatLoader color="white" /></h1>)
                : (<div>{children}</div>)
            }

        </div>
    )

}

export default AuthLayout;
