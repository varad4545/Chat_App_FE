import express from 'express'
const app=express()
import path from 'path'
import http from 'http'
import { Server } from "socket.io";

const httpserver=http.createServer(app)
const PORT=process.env.PORT || 3000

httpserver.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})


const __dirname = path.resolve();
app.use(express.static(__dirname+'/public'))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

// Socket 

const io = new Server(httpserver)
io.on('connection',(socket)=>{
    console.log('Connected...')
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})








