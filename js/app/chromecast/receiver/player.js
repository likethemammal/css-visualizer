define(['app/options', 'bean'], function(Options, Bean) {

    var Player = {

        isLoaded: false,
        isPlaying: false,
        audio: window.mediaElement,

        mediaManager: window.mediaManager,

        init: function() {
            Bean.on(this.audio, 'paused', this.onPlayPause.bind(this));
            Bean.on(this.audio, 'play', this.onPlayPause.bind(this));
            Bean.on(this.audio, 'load', this.onLoad.bind(this));
            Bean.on(this.audio, 'playing', _.throttle(this.onPlayPause.bind(this), 100));

//            this.mediaManager.onLoad = this.onLoad.bind(this);
//            this.mediaManager.onLoad = this.onLoad.bind(this);

            Bean.on(window, 'player.connected', this.onSocketConnected.bind(this));
        },

        onPlayPause: function() {
            this.isPlaying = this.audio.duration > 0 && !this.audio.paused;

            if (this.isPlaying) {
                Bean.fire(window, 'view.visStart');
            }
        },

        onLoad: function(ev) {
            this.isLoaded = true;

            if (this.socketConnected) {
                this.startPlayback();
            }
        },

        onSocketConnected: function() {
            this.socketConnected = true;

            if (this.isLoaded) {
                this.startPlayback();
            }
        },

        startPlayback: function() {
            this.audio.play();
        }
    };

    return Player;
});
