import sdk from 'matrix-js-sdk'
require("dotenv").config()
var msglist=[]
var timedata=[]

const matrixclient=sdk.createClient({
    baseUrl:"https://matrix.org",
    accessToken: process.env.accessToken,
    userId: process.env.username
})
console.log(process.env.USERNAME)
matrixclient.login("m.login.password", {"user":process.env.USERNAME, "password":process.env.PASSWORD}).then((response) => {
    console.log("Succcessful Login");
});


matrixclient.once('sync', function(state, prevState, res) {
    console.log(state); 
});
matrixclient.startClient();



function getmessages()
{
    matrixclient.on("Room.timeline", function(event, room, toStartOfTimeline)
    {
        console.log(room)
        console.log(toStartOfTimeline)
        console.log("Enter inside")
        console.log(event.event)
        if (event.getType() !== "m.room.message") {
            console.log(msglist)
            return; 
          }
          console.log(event.event)
          if(event.event.sender!="@varad4546:matrix.org")
          {
            console.log(event.event.content)
            appendMessage1(event.event.content,'incoming','Discord')
            msglist.push(event.event.content.body)
          }
          else{
            console.log(event.event.content)
            appendMessage1(event.event.content,'outgoing',name)
          }
    });
}

getmessages()


const socket=io()
let name;
let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector('.message__area')


do{
   name=prompt("Please Enter your name")
}while(!name)


textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
      
        console.log("next next")
      
    }
})

function sendMessage(message){
    let msg={
        user: name,
        message:message.trim()
    }

    socket.emit('message',msg)
     console.log(msg)

     var testRoomId = process.env.TESTROOMID;
    var content = {
        "body": msg.message,
        "msgtype": "m.text"
      };
      console.log(content)
     matrixclient.sendEvent(testRoomId,"m.room.message", content, "").then((res) => {
      console.log("Message sent successfully")

    }).catch((err) => {
        console.log(err)
        console.log("Message not sent");
    })
    
}



function appendMessage1(msg,type,user){
    let mainDiv=document.createElement('div')
    let className=type
    mainDiv.classList.add(className,'message')

    let markup=`
      <h4>${user}</h4>
      <p>${msg.body}</p>
    `
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)
}




