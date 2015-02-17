define(['app/options', 'bean', 'underscore'], function (Options, Bean, _) {

    var PlayerModel = {

        audio: new Audio(),
        audioLoaded: false,

        playbackRate: 1,

        DurationTimer: 0,

        init: function() {
            Bean.on(window, 'loadAndPlay', _.bind(this.loadAndPlay, this));
            Bean.on(window, 'next', _.bind(this.nextSong, this));
            Bean.on(window, 'playPause', this.togglePlayPause, this);
            Bean.on(window, 'model.setVolume', _.bind(this.setVolume, this));
            Bean.on(window, 'chromecastConnected', this.onChromecastConnected.bind(this));
            Bean.on(window, 'player.trackInfo', _.bind(this.onNewTrackInfo, this));
        },

        loadAndPlay: function() {
            if (!this.audioLoaded) {
                dancer.load(this.audio);
                this.audioLoaded = true;
            }

            dancer.play();
        },

        togglePlayPause: function() {
            if (dancer.isPlaying()) {
                dancer.pause();
            } else {
                dancer.play();
            }
        },

        nextSong: function() {
            // todo: fix error for "Failed to execute 'createMediaElementSource' on 'AudioContext'", might be a Chrome bug;
            dancer.pause();

            Bean.fire(window, 'queue.requestNextSong');

        },

        onNewTrackInfo: function(trackInfo) {
            if (this.chromecastConnected) {
                this.setVolume(Options.chromecastVolume);
                this.playbackRate = Options.chromecastPlaybackRate;
            }

            Bean.fire(window, 'view.resetDuration');

            clearInterval(this.DurationTimeout);

            this.DurationTimeout = setInterval(_.bind(function() {
                if (this.audio.duration) {
                    var totalDuration = Math.floor(this.audio.duration);
                    var currentDuration = this.audio.currentTime;
                    var percentComplete = currentDuration/totalDuration || 0;
                    var precision = 100;
                    var percentLeft = Math.floor((1 - percentComplete)*100 * precision) / precision;


                    Bean.fire(window, 'view.durationProgress', percentLeft + '%');
                }
            }, this) , (1000 / 60) * this.playbackRate);

            Bean.fire(window, 'view.metadata', [[trackInfo.artist, trackInfo.title, trackInfo.artistUrl, trackInfo.titleUrl]]);

            this.audio.src = trackInfo.streamUrl;
            this.audio.playbackRate = this.playbackRate;

            Bean.off(this.audio, 'ended');
            Bean.on(this.audio, 'ended', _.bind(this.nextSong, this));

            Bean.fire(window, 'loadAndPlay');
        },

        setVolume: function(volume) {
            this.audio.volume = volume;
            Bean.fire(window, 'visualizer.setVolume', volume);
        },

        onChromecastConnected: function() {
            this.chromecastConnected = true;
        }
    };

    return PlayerModel;

});