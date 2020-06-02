import React from 'react';
import '../Styles/input.scss';

const Input = React.memo(({type,name,holder,handler,value}) => {
    console.log(name)
    return (
        <section className="input_container">
            <input className="input" type={type} name={name} placeholder={holder} value={value} onChange={handler}/>
        </section>
    )
})

export default Input;
