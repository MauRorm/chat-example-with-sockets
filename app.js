let express = require('express');  
let app = express();  
let server = require('http').Server(app);  
let io = require('socket.io')(server);

const messages = [
	{  
	  text: "¿En que podemos ayudarle?",
	  author: "Atención a cliente"
	}
];

const botMessage =  {  
    text: "Tan pronto podamos le enviaremos información",
    author: "Atención a cliente"
  };

app.use(express.static('public'));

io.on('connection', socket => {
	console.log('Socket establecido');
	socket.emit('messages', messages);
	socket.on('new-message', data => {
		console.log('nuevo mensaje');
		messages.push(data);
		setTimeout(() => {
			messages.push(botMessage);
			socket.emit('messages', messages);
		}, 3000);
		socket.emit('messages', messages);
	});
});

server.listen(3000,() => {
	console.log("Servidor corriendo en http://localhost:3000");
});
