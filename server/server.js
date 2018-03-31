const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const port = process.env.PORT || 3000;
const  publicPath = path.join(__dirname, '../public');
let app = express();

let server = http.createServer(app);	// now we can use server instead of app 
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New User Connected');

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat room'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

	socket.on('createMessage', (message, callback) => {
		console.log('createMessage', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('This is from the server.');
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