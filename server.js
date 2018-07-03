var express = require('express');
var app = express();
var server = require('http').createServer(app);  
var io = require('socket.io')(server);


app.use(express.static(__dirname + '/public')); 
//redirect / to our index.html file
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/public/index.html');
});

//start our web server and socket.io server listening
server.listen(3000, function(){
    console.log('listening on *:3000');
});

io.on('connection', function(client) { 
	console.log('Client connected...'); 
	//when the server receives clicked message, do this
    client.on('clicked', function(data) {
          console.log(data);
		  io.emit('buttonUpdate', data);
    });
});
