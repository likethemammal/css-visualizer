define(['app/options', 'bean'], function(Options, Bean) {

    var Player = {

        isPlaying: false,

        init: function() {
            Bean.on(this.audio, 'paused', this.onPlayPause.bind(this));
            Bean.on(this.audio, 'play', this.onPlayPause.bind(this));
            Bean.on(this.audio, 'canplaythrough', this.onLoad);
            Bean.on(window, 'player:start', this.startPlayback.bind(this));
        },

        onPlayPause: function() {
            this.isPlaying = this.audio.playing;
        },

        onLoad: function() {
            this.isLoaded = true;

            if (this.socketConnected) {
                this.audio.play();
            }
        },

        startPlayback: function() {
            this.socketConnected = true;

            if (this.isLoaded) {
                this.audio.play();
            }
        }
    };

    return Player;
});
