var user = '';
var socket = io();
//Log in pop-up
document.getElementById('login').style.animationName = 'popup';
document.getElementById('submit-button').addEventListener('click', e => {
	e.preventDefault();
	if (document.getElementById('login-name').value !== '') {
		user = document.getElementById('login-name').value;
		document.getElementById('login').style.animationName = 'popout';
		setTimeout(() => {
			document.body.removeChild(document.getElementById('login'));
			EnableChat();
		}, 1200);
	} else {
		alert('Username cant be empty');
	}
});
//enables the main function
const EnableChat = () => {
	//welcome message to the user
	document.body.innerHTML += `<div id='welcome-msg'>Welcome ${user} to Chat's</div>`;
	document.getElementById('welcome-msg').style.animationName = 'fade';
	socket.emit('is online', user);
	setTimeout(() => {
		//removes and creates the necessary html
		document.body.removeChild(document.getElementById('welcome-msg'));
		document.body.innerHTML += `<div id="user-name">Log out</div>`;
		document.body.innerHTML += `<div id='get-curr-users'>${user}</div>`;
		document.body.innerHTML += `
    <div id='chat-area'>
    <ul id='chat-room'>
    </ul>
      <form id='msg-container'>
        <input type='text' autocomplete='off' required id='msg' placeholder='Enter Message'/>
        <input type="submit" class='msg-button' value='Send'/>
      </form>
    </div>`;
		CreateChat();
	}, 3450);
	//send a alert message to other users that a new user is online
	socket.on('is online', username => {
		document.body.innerHTML += `<div id='welcome-msg'>${username} has just joined Chat's.Say hello</div>`;
		document.getElementById('welcome-msg').style.animationName = 'fade';
		setTimeout(() => {
			document.body.removeChild(document.getElementById('welcome-msg'));
			//For some odd reason i had to call this funtion each time a user logges in for all the users
			CreateChat();
		}, 3450);
	});
};
//enables chat for all users once a user has logged in
const CreateChat = () => {
	const msgBtn = document.querySelector('#msg-container');
	msgBtn.addEventListener('submit', event => {
		event.preventDefault();
		event.stopPropagation();
		socket.emit('chat message', {
			user: user,
			message: document.getElementById('msg').value
		});
		document.getElementById('chat-room').innerHTML += `<li class='msg-sent'>
        <h5>You:</h5>
        <p>${document.getElementById('msg').value}</p>
	</li>`;
		document.getElementById('msg').value = '';
	});

	//When a user logs out,it will send a message to other users that he has logged out
	document.getElementById('user-name').addEventListener('click', async () => {
		if (confirm('are you sure you want to Log Out')) {
			await socket.emit('dissconnect', user);
			window.location.reload(true);
		}
	});
};
//reusing the #welcome-msg component for logging in,alerting other users about logging in ,and alerting other users about logging out
socket.on('dissconnect', username => {
	document.body.innerHTML += `<div id='welcome-msg'>${username} has left Chat's</div>`;
	document.getElementById('welcome-msg').style.animationName = 'fade';
	setTimeout(() => {
		document.body.removeChild(document.getElementById('welcome-msg'));
		CreateChat();
	}, 3450);
});
//adds a message to the board for the reciver
socket.on('chat message', obj => {
	const { user, message } = obj;
	document.getElementById('chat-room').innerHTML += `<li class='msg-recived'>
      <h5>${user}:</h5>
      <p>${message}</p>
  </li>`;
});
