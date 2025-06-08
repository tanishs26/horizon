import React from 'react';
import { forwardRef, useId } from 'react';
const Input = forwardRef(({ label, type = "text", placeholder, className, ...props }, ref) => {
    const id = useId();
    return (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <br/>
            <input type={type} id={id} placeholder={placeholder} className={`bg-white/5 outline-none backdrop-blur-3xl
                max-w-full ${className}`}  {...props} ref={ref} />

        </div>
    );
}
)                                                                                                                                                        
export default Input;
