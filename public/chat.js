//a screen pops up and asks the for the username
//once u loged in it sends other user a message that u have joined the party
//u can send and recive messages
//it will automaticly notify all the other users that u are typing while u are typing

//WIll THING ABOUT THESE
//maybe add a feture to create a private group that will only emit messages to the people of the selected group
//add the possiblaty to hide messages to all users except the select ones
//maybe create a login or a signup forum connected to firebase

var user = "";
var socket = io();

//onload a popup will ask the user to enter his username,and once a user submits his name,it will popout of the screen and enable for the user to chat with other users

document.getElementById("login").style.animationName = "popup";
document.getElementById("submit-button").addEventListener("click", e => {
  e.preventDefault();
  if (document.getElementById("login-name").value !== "") {
    user = document.getElementById("login-name").value;
    document.getElementById("login").style.animationName = "popout";
    setTimeout(() => {
      document.body.removeChild(document.getElementById("login"));
      EnableChat();
    }, 1200);
  } else {
    alert("you need to fill in the name");
  }
});
//EveryThins is writen in this main function
const EnableChat = () => {
  //welcome board for the current user
  document.body.innerHTML += `<div id='welcome-msg'>Welcome ${user} to Chat's</div>`;
  document.getElementById("welcome-msg").style.animationName = "fade";
  socket.emit("is online", user);
  setTimeout(() => {
    document.body.removeChild(document.getElementById("welcome-msg"));
    document.body.innerHTML += `<div id="user-name">${user}</div>`;
    document.body.innerHTML += `
    <div id='chat-area'>
    <ul id='chat-room'>
    </ul>
      <div id='msg-container'>
        <input type='text' autocomplete='off' id='msg' placehoalder='Enter Message'/>
        <button id='msg-button'>Send</button>
      </div>
    </div>`;
    CreateChat();
  }, 3450);
  //
  //
  //
  //welcome for the other users
  socket.on("is online", username => {
    document.body.innerHTML += `<div id='welcome-msg'>${username} has just joined Chat's.Say hello</div>`;
    document.getElementById("welcome-msg").style.animationName = "fade";
    setTimeout(() => {
      document.body.removeChild(document.getElementById("welcome-msg"));
    }, 3450);
    //
    //
    //will add a chat enabled function where most of the code will be stored,maybe even import that code from another js page
  });
};

//ask the user if
const CreateChat = () => {
  const msgBtn = document.getElementById("msg-button");
  msgBtn.addEventListener(
    "click",
    () => {
      if (document.getElementById("msg").value !== "") {
        socket.emit("chat message", {
          user: user,
          message: document.getElementById("msg").value
        });
        document.getElementById("chat-room").innerHTML += `<li class='msg-sent'>
        <h5>You:</h5>
        <p>${document.getElementById("msg").value}</p>
    </li>`;
        document.getElementById("msg").value = "";
      } else {
        alert("You need to enter something");
      }
    },
    false
  );
  //
  //
  //
  //

  socket.on("chat message", obj => {
    const { user, message } = obj;
    document.getElementById("chat-room").innerHTML += `<li class='msg-recived'>
        <h5>${user}:</h5>
        <p>${message}</p>
    </li>`;
  });
};
