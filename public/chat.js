var user = '';
var socket = io();
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
//EveryThins is writen in this main function
const EnableChat = () => {
	//welcome board for the current user
	document.body.innerHTML += `<div id='welcome-msg'>Welcome ${user} to Chat's</div>`;
	document.getElementById('welcome-msg').style.animationName = 'fade';
	socket.emit('is online', user);
	setTimeout(() => {
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
	//
	//
	//
	//welcome for the other users
	socket.on('is online', username => {
		document.body.innerHTML += `<div id='welcome-msg'>${username} has just joined Chat's.Say hello</div>`;
		document.getElementById('welcome-msg').style.animationName = 'fade';
		setTimeout(() => {
			document.body.removeChild(document.getElementById('welcome-msg'));
			CreateChat();
		}, 3450);
		//
		//
		//will add a chat enabled function where most of the code will be stored,maybe even import that code from another js page
	});
};
//ask the user if
const CreateChat = () => {
	const msgBtn = document.querySelector('#msg-container');
	const getUsers = document.getElementById('get-curr-users');
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
	document.getElementById('msg').value='';
	});
	//
	//
	//

	document.getElementById('user-name').addEventListener('click', async () => {
		if (confirm('are you sure you want to Log Out')) {
			await socket.emit('dissconnect', user);
			window.location.reload(true);
		}
	});
	//
	//
	//
	getUsers.addEventListener('click', () => {
		socket.emit('get users', user);
	});
};
socket.on('dissconnect', username => {
	document.body.innerHTML += `<div id='welcome-msg'>${username} has left Chat's</div>`;
	document.getElementById('welcome-msg').style.animationName = 'fade';
	setTimeout(() => {
		document.body.removeChild(document.getElementById('welcome-msg'));
		CreateChat();
	}, 3450);
});
socket.on('chat message', obj => {
	const { user, message } = obj;
	document.getElementById('chat-room').innerHTML += `<li class='msg-recived'>
      <h5>${user}:</h5>
      <p>${message}</p>
  </li>`;
});
