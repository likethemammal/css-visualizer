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
            Bean.on(window, 'playerController.announceVolume', _.bind(this.onVolumeChange, this));

        },

        onVolumeChange: function(ev) {
            var volume =  this.volumeSlider.value / 100;

            Bean.fire(window, 'playerModel.volumeChange', volume);
        },

        onNext: function() {
            Bean.fire(window, 'playerView.next');
        },

        onPlayPause: function() {
            var playing = dancer.isPlaying();

            Bean.fire(window, 'playerView.playPause', playing);
        }
    };

    return Player;
});
