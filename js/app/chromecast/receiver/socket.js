var room = 0;
window.onload = startSocket;

function startSocket() {
    // Connect to socket.io
    var socket = io.connect();

    //Connect to server
    socket.on('connect', function(){

        socket.on('audiodata', onAudioData);

        //Join room with roomID from desktop
        socket.emit('chromecast-join', roomID);
    });

}