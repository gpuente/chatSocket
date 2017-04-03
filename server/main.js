var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
	id : 1,
	text : "Se ha unido a la sala de chat",
	author : "Server"
}];

app.use(express.static('public'));

app.get('/hello', function(req, res){
	res.status(200).send('Server is running');
});

io.on('connection', function(socket){
	console.log('Alguien se ha conectado con sockets');
	socket.emit('messages', messages);

	socket.on('newMessage', function(data){
		console.log(data);
		messages.push(data);
		io.sockets.emit('messages', messages);
	});
});


server.listen(3000, function(){
	console.log('Servidor iniciado en: http://localhost:3000');
});