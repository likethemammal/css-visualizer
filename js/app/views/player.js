define([
    'app/options',
    'bean',
    'app/controllers/Player'
], function (
    Options,
    Bean,
    PlayerController
    ) {

    var Player = {

        ui: document.getElementById('ui'),
        duration: document.getElementById('duration'),
        volumeSlider: document.getElementById('volume-slider'),

        init: function() {
            PlayerController.init();

            Bean.on(window, 'playerView.next', this.onNext);
            Bean.on(window, 'playerView.playPause', _.bind(this.onPlayPause, this));

            Bean.on(window, 'view.metadata', _.bind(this.attachMetaData, this));
            Bean.on(window, 'view.resetDuration', _.bind(this.setDuration, this));
            Bean.on(window, 'view.durationProgress', _.bind(this.setDuration, this));
            Bean.on(window, 'chromecastConnected', _.bind(function(visualizerSettings) {
                if (!this.chromecastConnected) {
                    this.chromecastConnected = true;
                }
            }, this));

            this.setupVolume();
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

        onNext: function() {
            Bean.fire(window, 'next');
        },

        onPlayPause: function(playing) {
            if (playing) {
                this.playPause.style['background-image'] = "url('imgs/glyphicons_173_play.png')";
            } else {
                this.playPause.style['background-image'] = "url('imgs/glyphicons_174_pause.png')";
            }

            Bean.fire(window, 'playerModel.playPause');
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
