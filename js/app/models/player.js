define(['app/options', 'bean', 'underscore'], function (Options, Bean, _) {
    var AudioContext = window.AudioContext || window.webkitAudioContext;

    var PlayerModel = {

        audio: new Audio(),
        context: new AudioContext(),
        audioLoaded: false,

        playbackRate: 1,

        DurationTimer: 0,

        init: function() {
            this.audio.crossOrigin = "anonymous";
            this.audio.id = 'audio';
            document.body.appendChild(this.audio);
            window.analyser = this.context.createAnalyser();

            Bean.on(window, 'loadAndPlay', _.bind(this.loadAndPlay, this));
            Bean.on(window, 'next', _.bind(this.nextSong, this));
            Bean.on(window, 'playerModel.playPause', _.bind(this.togglePlayPause, this));
            Bean.on(window, 'playerModel.volumeChange', _.bind(this.setVolume, this));
            Bean.on(window, 'player.trackInfo', _.bind(this.onNewTrackInfo, this));
            Bean.on(this.audio, 'canplaythrough', function() {
                Bean.fire(window, 'loadAndPlay');
            });
        },

        loadAndPlay: function() {
            if (!this.audioLoaded) {
                var source = this.context.createMediaElementSource(this.audio);

                source.connect(analyser);
                analyser.connect(this.context.destination);

                this.audioLoaded = true;
            }

            this.audio.play();
        },

        togglePlayPause: function() {
            if (!this.audio.paused) {
                this.audio.pause();
            } else {
                this.audio.play();
            }
        },

        nextSong: function() {
            this.audio.pause();

            Bean.fire(window, 'queue.requestNextSong');

        },

        onDuration: function() {
            if (this.audio.duration) {
                var totalDuration = Math.floor(this.audio.duration);
                var currentDuration = this.audio.currentTime;
                var percentComplete = currentDuration/totalDuration || 0;
                var precision = 100;
                var percentLeft = Math.floor((1 - percentComplete)*100 * precision) / precision;


                Bean.fire(window, 'view.durationProgress', percentLeft + '%');
            }
        },

        onNewTrackInfo: function(trackInfo) {
            Bean.fire(window, 'view.resetDuration');

            clearInterval(this.DurationTimeout);

            this.DurationTimeout = setInterval(_.bind(this.onDuration, this) , (1000 / 60) * this.playbackRate);

            Bean.fire(window, 'view.metadata', [[trackInfo.artist, trackInfo.title, trackInfo.artistUrl, trackInfo.titleUrl, trackInfo.albumSrc]]);

            this.audio.src = trackInfo.streamUrl;
            this.audio.playbackRate = this.playbackRate;

            Bean.off(this.audio, 'ended');
            Bean.on(this.audio, 'ended', _.bind(this.nextSong, this));

        },

        setVolume: function(volume) {
            this.audio.volume = volume;
            Bean.fire(window, 'visualizer.setVolume', volume);
        }
    };

    return PlayerModel;

});