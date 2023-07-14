const express= require('express');
const { Socket } = require('socket.io');
// require("socket.io/socket.io.js")
const app= express();

const http= require('http').createServer(app)

const PORTs= process.env.PORT || 3000

http.listen(PORTs,()=>{
        console.log(`Listening on the port ${PORTs}`);
})

app.use(express.static(__dirname))
app.get('/',(req,res)=>{
        console.log(__dirname +"/public");
        res.sendFile(__dirname + '/index.html');
})

const io=require('socket.io')(http)

io.on('connection',(socket)=>{
       console.log('Connected...')
       socket.on('message',(msg)=>{
            socket.broadcast.emit('message',msg)
       })
})