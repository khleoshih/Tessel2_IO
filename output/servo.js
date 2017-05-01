var tessel = require('tessel');
var servolib = require('servo-pca9685');

var servo = servolib.use(tessel.port['A']);

var servo1 = 1;
var position = 0;

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

io.on('connection', function(socket){
	socket.on('position', function(pos){
		servo.configure(servo1, 0.05, 0.12, function () {
      			servo.move(servo1, pos);
		});	
	});
});
