import React from 'react';
import {GroupContest} from '../../userContest';
import {useHistory} from 'react-router-dom';
import './styles/frame.scss';
import Model from '../Models/ErrTokenModel/frame';
import io from 'socket.io-client';
let socket;

const ChatFrame = () => {
    const {logIn,expiresAt,userName,groupToken}=React.useContext(GroupContest);
    const [show,useShow]=React.useState(false)
    const leftTime=((new Date(expiresAt).getTime()-new Date().getTime())/60000).toFixed(2);
    const ClearModel=()=>{
      useShow(prev=>false)
    }
    const ENDPOINT=process.env.REACT_APP_ENDPOINT;
    React.useEffect(()=>{
       socket=io(ENDPOINT);
       socket.emit('join',{userName,token:groupToken},()=>{

       });
       return(()=>{
         socket.emit('disconnect');
         socket.off();
       });

    },[ENDPOINT]);
    React.useEffect(()=>{
      const NavigateHome=()=>{
        useHistory().push('/');
      }
      if(!logIn){
          NavigateHome();
      }
    },[logIn])
    React.useEffect(()=>{
      const Trigger=()=>{
        useShow(prev=>true)
      }
      Trigger();
    },[])
    return (
      <>
      {show?<Model
          Title="Ends By"
          Desc={`Your chats ends by ${leftTime} Minutes`}
          Btn="Back"
          fun={ClearModel}
        />:null}
        <div class="chat_container">
            
        </div>
      </>
    )
}

export default ChatFrame;
