var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.use(express.static('public'));
http.listen(3000, () => {
  console.log('server starterd');
});
io.on('connection', socket => {
	socket.on('chat message', msg => {
		socket.broadcast.emit('chat message', msg);
	});

	socket.on('is online', username => {
		socket.broadcast.emit('is online', username);
	});
	socket.on('dissconnect',user=>{
		socket.broadcast.emit('dissconnect',user);
	})
});
