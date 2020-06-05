import React from 'react';
import '../Styles/input.scss';

const Input = React.memo(({type,name,holder,handler,value}) => {
    const [blur,setblur]=React.useState(false);
    const blurHandler=()=>{
        setblur((prev)=>true)
    }
    return (
        <section className={blur && value===""?"input_container red_border":"input_container"}>
            <input className="input" onBlur={blurHandler} type={type} name={name} placeholder={holder} value={value} onChange={handler}/>
        </section>
    )
})

export default Input;
