/* Express 3 requires that you instantiate a `http.Server` to attach socket.io to first */
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    uuid = require('node-uuid'),
    port = 3000,
    url  = 'http://localhost:' + port + '/';

/* We can access nodejitsu enviroment variables from process.env */
/* Note: the SUBDOMAIN variable will always be defined for a nodejitsu app */
if(process.env.SUBDOMAIN){
    url = 'http://' + process.env.SUBDOMAIN + '.jit.su/';
}

server.listen(port);
console.log("Express server listening on port " + port);
console.log(url);

app.use(express.static(process.cwd()));

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

        //Send roomID back to desktop
        io.sockets.in(roomID).emit('joined-room', roomID);
    });

    //chromecast asking to join
    socket.on('chromecast-subscribe', function(data) {
        socket.join(data.room);

        console.log('chromecast connected');

        //Tell desktop chromecast has connect and give chromecast width to desktop for visualizer settings
        io.sockets.in(data.room).emit('chromecast-connected', data.visSettings);
    });

    socket.on('server-audiodata', function(data) {
        console.log(data.audiodata);

        io.sockets.in(data.room).emit('chromecast-audiodata', {
            songChanged: data.songChanged,
            audiodata: data.audiodata
        });
    })

});