define(['app/options', 'bean', 'socketio'], function (Options, Bean, io) {

    var Socket = {

        socket: '',
        room: '',

        init: function() {
            Bean.on(window, 'socket.connect', this.connect.bind(this));
            Bean.on(window, 'socket.sendRoom', this.sendRoom.bind(this));

            console.log('socket inited')
        },

        connect: function() {

            console.log(this.socket)

            // Connect to socket.io
            this.socket = io.connect();

            //Connect to server
            this.socket.on('connect', function(){

                //Get the roomID to send to the chromecast
                this.socket.on('joined-room', this.joinedRoom.bind(this));

                console.log('socket room created');
                //Create a room for this desktop and a chromecast
                this.socket.emit('create-room');


            }.bind(this));
        },

        joinedRoom: function(roomID) {
            //This socket is already in room
            console.log('room joined');

            if (this.room !== '') {
                return;
            }

            //When chromecast is connected allow playback
            this.socket.on('chromecast-connected', function(visSettings) {
                //Remove any events for a second possible misfire

                Bean.off(window, 'socket.audiodata');
                Bean.on(window, 'socket.audiodata', this.sendAudioData.bind(this));

                //Let other modules know the chromecast has conencted
                Bean.fire(window, 'chromecastConnected', visSettings);
            }.bind(this));

            this.room = roomID;

            console.log('on room joined',this.room);

            this.sendRoom();
        },

        sendRoom: function() {

            console.log('room is:', this);

            //Send roomID to chromecast to connect to server as well
            Bean.fire(window, 'sender.message', {
                event: 'socket.subscribe',
                value: {
                    room: this.room
                }
            });

            console.log('room id sent to chromecast')

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