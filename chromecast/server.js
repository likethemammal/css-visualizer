var path = require('path');
var express = require('express');
var app = express();
var http = require('http');
var httpServer = http.createServer(app);
var io = require('socket.io').listen(httpServer);

var host = '0.0.0.0';
var port = 3000;

app.use(express.static(__dirname));

io.on('connection', function(socket){
    console.log('connected');
    socket.emit('ServerEvent', { some: 'connected' });
    socket.on('ClientEvent', function(data){
        console.log('client event')
        socket.broadcast.emit('ServerEvent', { some: data.some });
    });
});

httpServer.listen(port, host, 511, function() {
    console.log('serving at ', port)
});