define(['app/options', 'bean', 'socketio'], function (Options, Bean, io) {

    var Socket = {

        socket: '',
        room: '',

        init: function() {
            Bean.on(window, 'socket.connect', this.connect.bind(this));
            Bean.on(window, 'socket.sendRoom', this.sendRoom.bind(this));
        },

        connect: function() {

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
            console.log('room joined');

            //This socket is already in room
            if (this.room !== '') {
                return;
            }

            //When chromecast is connected allow playback
            this.socket.on('chromecast-connected', function(visSettings) {
                console.log('chromecast connected to socket')

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
            // JSON.stringify can't handle complex objects so we just stringify the seconds obj.
            var audioDataPacketStr = JSON.stringify({
                seconds: data.audioDataPacket.seconds
            });

            this.socket.emit('server-audiodata', {
                room: this.room,
                songChanged: data.songChanged,
                audioDataPacket: audioDataPacketStr
            });
        }
    };

    return Socket;
});