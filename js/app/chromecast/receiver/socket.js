define(['app/options', 'bean', 'socketio', 'app/chromecast/receiver/visualizers/bars'], function(Options, Bean, io, visualizer) {

    var Socket = {

        room: 0,

        init: function() {
            // Connect to socket.io
            this.socket = io.connect();

            Bean.on(window, 'socket.subscribe', this.subscribeSocket.bind(this));

            this.socket.on('chromecast-connected', this.onSocketConnection.bind(this));

            //Connect to server
            this.socket.on('connect', function() {
                this.socket.on('audiodata', this.onAudiodata);
            }.bind(this));
        },

        subscribeSocket: function(data) {

            console.log('subscribing to socket')

            //Join room with roomID from desktop
            this.socket.emit('chromecast-subscribe', {
                room: data.room,
                visSettings: visualizer.settings
            });
        },

        onSocketConnection: function() {
            Bean.fire(window, 'player.start');
            console.log('player.start')
        },

        onAudioData: function(data) {
            Bean.fire(window, 'queue.audiodata', data);
        }

    };

    return Socket;

});