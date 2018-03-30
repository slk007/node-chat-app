const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const  publicPath = path.join(__dirname, '../public');
let app = express();

let server = http.createServer(app);	// now we can use server instead of app 
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New User Connected');

	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to the chat room',
		createdAt: new Date().getTime()
	});

	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New User joined',
		createdAt: new Date().getTime()
	});

	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});
});

server.listen(port, () => {				//using server instead of app
	console.log(`Started up at port ${port}`);
});