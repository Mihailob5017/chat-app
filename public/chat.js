var user='';
var socket = io();


var submit=document.querySelector('#submit');
submit.addEventListener('click',e=>{
    e.preventDefault();
    user=document.querySelector('#username').value;
    document.querySelector('#islogedin').innerHTML=user;
    document.querySelector('#message-btn').disabled=false;
})




var sendMsg=document.querySelector('#message-btn');
sendMsg.addEventListener('click',e=>{
    e.preventDefault();
    let object={username:document.getElementById('islogedin').innerText,message:document.querySelector('#message').value}

    document.querySelector('.message-box').innerHTML+=`<li class='msg-sent'><h3>${object.username}</h3><p>${object.message}</p></li>`;
    socket.emit('chat message',object)
    document.querySelector('#message').value='';
})

socket.on('chat message',obj=>{
    const {username,message}=obj;
     document.querySelector('.message-box').innerHTML+=`<li class='msg-recived'><h3>${username}</h3><p>${message}</p></li>`;
})




