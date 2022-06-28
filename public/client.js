import matrixclient from './matrixclient.js'
console.log(matrixclient)
const socket=io()
let name;
let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector('.message__area')


// import {sdk} from 'matrix-js-sdk';
// const matrixclient=sdk.createClient({
//     baseUrl:"https://matrix.org",
//     accessToken: process.env.accessToken,
//     userId: process.env.username
// })

// console.log(matrixclient)
do{
   name=prompt("Please Enter your name")
}while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg={
        user: name,
        message:message.trim()
    }
    //Append
    appendMessage(msg,'outgoing')

    // Send to server
    socket.emit('message',msg)

    var content = {
        "body": msg,
        "msgtype": "m.text"
      };

    matrixclient.sendEvent(process.env.testRoomId,"m.room.message", content, "").then((res) => {
        console.log("Message sent successfully")
    }).catch((err) => {
        console.log("Message not sent");
    })
}

function appendMessage(msg,type){
     let mainDiv=document.createElement('div')
     let className=type
     mainDiv.classList.add(className,'message')

     let markup=`
       <h4>${msg.user}</h4>
       <p>${msg.message}</p>
     `
     mainDiv.innerHTML=markup
     messageArea.appendChild(mainDiv)
}

//Recieve messages

socket.on('message',(msg)=>{
    console.log(msg)
    appendMessage(msg,'incoming')
})