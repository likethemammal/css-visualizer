define([
    'app/options',
    'bean'
], function (
    Options,
    Bean
    ) {

    var Player = {

        ui: document.getElementById('ui'),
        playPause: document.getElementById('play-pause'),
        next: document.getElementById('next'),
        duration: document.getElementById('duration'),
        volumeSlider: document.getElementById('volume-slider'),

        init: function() {
            Bean.on(this.playPause, 'click', _.bind(this.onPlayPause, this));
            Bean.on(this.next, 'click', this.onNext);

            Bean.on(this.volumeSlider, 'change', _.bind(this.onVolumeChange, this));
            Bean.on(window, 'playerView.redefineVolume', _.bind(this.onVolumeChange, this));

            Bean.on(window, 'playerView.setupVolume', _.bind(this.setupVolume, this));
            Bean.on(window, 'view.metadata', _.bind(this.attachMetaData, this));
            Bean.on(window, 'view.resetDuration', _.bind(this.setDuration, this));
            Bean.on(window, 'view.durationProgress', _.bind(this.setDuration, this));
            Bean.on(window, 'chromecastConnected', _.bind(function(visualizerSettings) {
                if (!this.chromecastConnected) {
                    this.chromecastConnected = true;
                }
            }, this));
        },

        setupVolume: function() {
            var modifer = 100;

            if (Options.debug) {
                this.volumeSlider.value = Options.debugVolume * modifer;
            } else {
                this.volumeSlider.value = Options.defaultVolume * modifer;
            }

            Bean.fire(this.volumeSlider, 'change');
        },

        setDuration: function(val) {
            val = val || '100%';
            this.duration.style.right = val;
        },

        onVolumeChange: function(ev) {
            var volume =  this.volumeSlider.value / 100;

            Bean.fire(window, 'model.setVolume', volume);
        },

        onNext: function() {
            Bean.fire(window, 'next');
        },

        onPlayPause: function() {
            if (dancer.isPlaying()) {
                this.playPause.style['background-image'] = "url('imgs/glyphicons_173_play.png')";
            } else {
                this.playPause.style['background-image'] = "url('imgs/glyphicons_174_pause.png')";
            }
            Bean.fire(window, 'playPause');
        },

        attachMetaData: function(trackInfo) {
            var artistStr = trackInfo[0] || '';
            var titleStr = trackInfo[1] || '';
            var artistUrl = trackInfo[2] || '';
            var titleUrl = trackInfo[3] || '';
            var artist = document.getElementById('artist');
            var title = document.getElementById('title');

            artist.innerText = artistStr;
            title.innerText = titleStr;
            artist.href = artistUrl;
            title.href = titleUrl;

            this.ui.style.opacity = 1;
        }

    };

    return Player;
});
