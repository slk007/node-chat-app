const path = require('path');
const express = require('express');
const socketIO = require('socket.io');


const port = process.env.PORT || 3000;
const  publicPath = path.join(__dirname, '../public');
let app = express();

app.use(express.static(publicPath));

// app.get('/', (req, res) => {
// 	res.render('index.html');
// });


app.listen(port, () => {
	console.log(`Started up at port ${port}`);
});