var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//io.on('connection', function(socket){
	var data = new Object();
	accel.on('ready', function () {
		accel.on('data', function (xyz) {
			data.x = xyz[0].toFixed(2);
			data.y = xyz[1].toFixed(2);
			data.z = xyz[2].toFixed(2);
			console.log(data.x);
			io.emit('accel', data);
		});		
	});

	accel.on('error', function(err){
  		console.log('Error:', err);
	});
//});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

