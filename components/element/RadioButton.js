import React from 'react';

const RadioButton = ({status , children , setStatus , value , title}) => {
    return (
        <div  className={value}>
                 <label htmlFor={value} > {children} {title}</label>
                 <input  type='radio' id={value} checked ={status === value} value={value} onChange={e=> setStatus(e.target.value)} />
        </div>
    );
};

export default RadioButton;