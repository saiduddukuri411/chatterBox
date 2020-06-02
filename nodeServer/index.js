const express=require('express');
const socketio=require('socket.io');
const http=require('http');
const genralRouter=require('./Routes/router');

const PORT=process.env.PORT || 5000;

const app=express();
const server=http.createServer(app);
const io=socketio(server);
io.on('connection',(sock)=>{
  console.log('we have new connection');


  sock.on('disconnect',()=>{
      console.log('user had left');
  })
});

app.use('/socket/api',genralRouter);

server.listen(PORT,()=>{
    console.log(`server has started on port ${PORT}`);
});