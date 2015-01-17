/* Express 3 requires that you instantiate a `http.Server` to attach socket.io to first */
var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    uuid = require('node-uuid'),
    port = 8080,
    url  = 'http://localhost:' + port + '/';

/* We can access nodejitsu enviroment variables from process.env */
/* Note: the SUBDOMAIN variable will always be defined for a nodejitsu app */
if(process.env.SUBDOMAIN){
    url = 'http://' + process.env.SUBDOMAIN + '.jit.su/';
}

server.listen(port);
console.log("Express server listening on port " + port);
console.log(url);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

//Socket.io emits this event when a connection is made.
io.sockets.on('connection', function (socket) {

    console.log('socket connected');

    // Print messages from the client.
    socket.on('create-room', function () {
        var roomID = uuid.v4();

        console.log('socket joined room: ', roomID);

        socket.join(roomID);
        socket.broadcast.to(roomID).emit('joined-room', roomID);
    });

    socket.on('chromecast-join', function(roomID) {
        socket.join(roomID);
        socket.broadcast.to(roomID).emit('chromecast-connected');
    });

});