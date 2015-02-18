define(['app/options', 'bean'], function(Options, Bean) {

    var Player = {

        isLoaded: false,
        isMetadataLoaded: false,
        isPlaying: false,
        audio: window.mediaElement,

        currentTime: 0,
        secondTimer: '',

        mediaManager: window.mediaManager,

        init: function() {
            Bean.on(this.audio, 'paused', this.onPlayPause.bind(this));
            Bean.on(this.audio, 'play', this.onPlayPause.bind(this));
            Bean.on(this.audio, 'load', this.onLoad.bind(this));
//            Bean.on(this.audio, 'playing', _.throttle(this.onPlayPause.bind(this), 100));

//            this.mediaManager.onLoad = this.onLoad.bind(this);
//            this.mediaManager.onLoad = this.onLoad.bind(this);

            Bean.on(window, 'player.metadata', this.onMetadataLoad.bind(this));
            Bean.on(window, 'player.connected', this.onSocketConnected.bind(this));
        },

        onPlayPause: function() {
            this.isPlaying = this.audio.duration > 0 && !this.audio.paused;

            //Set time so we don't have to get it from audio tag.
            this.currentTime = Math.floor(this.audio.currentTime);

            //Reset frames
            this.currentFrame = 0;

            //Reset timer regardless of play state change.
            clearInterval(this.secondTimer);

            if (this.isPlaying) {

                //Reset current second timer
                this.secondTimer = setInterval(this.secondClock.bind(this), 1000);

                //Start visualizer
                Bean.fire(window, 'view.visStart');
            }
        },

        onLoad: function(ev) {
            this.isLoaded = true;

            this.startPlayback();
        },

        onMetadataLoad: function(ev) {
            this.isMetadataLoaded = true;

            Bean.fire(window, 'receiver.message', 'chromecast.metadataReceived');

            this.startPlayback();
        },

        onSocketConnected: function() {
            this.socketConnected = true;

            this.startPlayback();
        },

        startPlayback: function() {
            if (this.socketConnected && this.isLoaded && this.isMetadataLoaded) {
                this.audio.play();
            }
        },

        secondClock: function() {
            this.currentTime++;
            this.currentFrame = 0;
        }
    };

    return Player;
});
