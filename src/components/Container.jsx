import React from 'react';

const Container = ({ children, className }) => {
    return (
        <div className={` w-full  max-w-[105rem] p-3 m-0 ${className} `} > {children}

        </div >
    );
}

export default Container;
