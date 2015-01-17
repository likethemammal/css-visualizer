define(['app/options', 'bean', 'socketio'], function (Options, Bean, io) {

    var Socket = {

        socket: '',

        init: function() {
            Bean.on(window, 'socket.connect', this.connect.bind(this));
        },

        connect: function() {
            // Connect to socket.io
            this.socket = io.connect();

            //Connect to server
            this.socket.on('connect', function(){

                //Get the roomID to send to the chromecast
                this.socket.on('joined-room', this.joinedRoom.bind(this));

                //Create a room for this desktop and a chromecast
                this.socket.emit('create-room');

            }.bind(this));
        },

        joinedRoom: function(roomID) {
            //This socket is already in room
            if (this.room) {
                return;
            }

            //When chromecast is connected allow playback
            this.socket.on('chromecast-connected', function() {

                //Let other modules know the chromecast has conencted
                Bean.fire(window, 'chromecastConnected');

                //Remove any events for a second possible misfire
                Bean.off(window, 'socket.audiodata');
                Bean.on(window, 'socket.audiodata', this.sendAudioData.bind(this));
            });

            this.room = roomID;

            //Send roomID to chromecast to connect to server as well
            Bean.fire(window, 'sender.message', {
                name: 'setRoomID',
                room: roomID
            });
        },

        sendAudioData: function(data) {
            this.socket.emit('audiodata', {
                room: this.room,
                message: data
            });
        }
    };

    return Socket;
});