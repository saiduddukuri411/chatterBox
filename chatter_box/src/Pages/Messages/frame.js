import React from 'react';
import './styles/frame.scss';
import ScrollToBottom from 'react-scroll-to-bottom';
import Single from './single';

const Messageframe = ({messages,name}) => {
    return (
        <ScrollToBottom className='scroller'>
            {messages.map((message,index)=>{
                return(<Single key={index} name={name[index]} message={message}/>)
            })}
        </ScrollToBottom>
    )
}

export default Messageframe;
