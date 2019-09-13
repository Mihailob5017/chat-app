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
window.addEventListener("load", () => {
  document.getElementById("login").style.animationName = "popup";
  document.getElementById("submit-button").addEventListener("click", e => {
    e.preventDefault();
    if (document.getElementById("login-name").value !== "") {
      user = document.getElementById("login-name").value;
      document.getElementById("login").style.animationName = "popout";
      setTimeout(() => {
        document.body.removeChild(document.getElementById("login"));
        EnableChat(user, socket);
      }, 1200);
    } else {
      alert("you need to fill in the name");
    }
  });
});
//EveryThins is writen in this main function
const EnableChat = (user, socket) => {
  //welcome board for the current user
  document.body.innerHTML += `<div id='welcome-msg'>Welcome ${user} to Chat's</div>`;
  document.getElementById("welcome-msg").style.animationName = "fade";
  socket.emit("is online", user);
  setTimeout(() => {
    document.body.removeChild(document.getElementById("welcome-msg"));
    document.body.innerHTML += `<div id="user-name">${user}</div>`;
    document //                                                         NEEDS FIXING
      .getElementById("user-name")
      .addEventListener("click", (socket, user) => Disconnect(socket, user));
  }, 5450);
  //
  //
  //
  //welcome for the other users
  socket.on("is online", username => {
    document.body.innerHTML += `<div id='welcome-msg'>${username} has just joined Chat's.Say hello</div>`;
    document.getElementById("welcome-msg").style.animationName = "fade";
    setTimeout(() => {
      document.body.removeChild(document.getElementById("welcome-msg"));
    }, 5450);
    //
    //
    //                                                                    NEEDS FIXING
    //alert other users that the user is discconected
    socket.on("disconnected", username => {
      alert(`${username} has disconnected`);
    });

    //will add a chat enabled function where most of the code will be stored,maybe even import that code from another js page
  });
};

//ask the user if
const Disconnect = (socket, user) => {
  if (window.confirm("Are you sure you want to disconnect ?")) {
    socket.emit("disconnected", user);
    document.location.reload();
  }
};
