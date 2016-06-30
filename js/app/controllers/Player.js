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
        volume: document.getElementById('volume-icon'),

        isMuted: false,
        oldVolume: 0,

        init: function() {
            Bean.on(this.playPause, 'click', _.bind(this.onPlayPause, this));
            Bean.on(this.next, 'click', this.onNext);

            Bean.on(this.volumeSlider, 'change', _.bind(this.onVolumeChange, this));
            Bean.on(this.volume, 'click', _.bind(this.onMuteToggle, this));
            Bean.on(window, 'playerController.announceVolume', _.bind(this.onVolumeChange, this));

            this.oldVolume = this.volumeSlider.value / 100;

        },

        onVolumeChange: function(ev) {
            var volume =  this.volumeSlider.value / 100;

            this.oldVolume = volume;

            Bean.fire(window, 'playerModel.volumeChange', volume);
        },

        onMuteToggle: function() {
            var isMuted = this.isMuted,
                newVolume;

            if (isMuted) {
                newVolume = this.oldVolume;
                this.volume.className = 'ion-android-volume-up ui-btn';
            } else {
                newVolume = 0;
                this.volume.className = 'ion-android-volume-off ui-btn';
            }

            Bean.fire(window, 'playerModel.volumeChange', newVolume);

            this.volumeSlider.value = newVolume * 100;
            this.isMuted = !isMuted;
        },

        onNext: function() {
            Bean.fire(window, 'playerView.next');
        },

        onPlayPause: function() {
            var playing = !PlayerModel.audio.paused;

            Bean.fire(window, 'playerView.playPause', playing);
        }
    };

    return Player;
});
