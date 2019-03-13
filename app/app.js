var express=require('express');
var app=express();
var path=require('path');
var io=require('socket.io')();



app.use('/views',express.static(__dirname +'app/views'));

app.set('view engine','ejs');
app.set('views', __dirname + '/views');


app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/chat'));
app.use(require('./routes/contactus'));
app.use(require('./routes/about'));

app.use('/css',express.static(__dirname +'/public/css'));
app.use('/pic',express.static(__dirname +'/public/images'));
app.use('/js',express.static(__dirname +'/public/js'));

var Server = app.listen(3000, function(){
	  console.log('listen to port 3000');
	});

	io.attach(Server);
	io.on('connection', function(socket) {
	  socket.on('postMessage', function(data) {
	    io.emit('updateMessages', data);
	  });
	});