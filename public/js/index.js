let socket = io();

socket.on('connect', function() {
	console.log('Connected to server');

	socket.emit('createMessage', {
		from: 'soni',
		text: 'A message was just created'
	});
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
	console.log('New Message:', message);
});
