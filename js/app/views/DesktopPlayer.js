define([
    'app/options',
    'bean',
    'app/views/Player',
    'app/controllers/Player'
], function (
    Options,
    Bean,
    PlayerView,
    PlayerController
    ) {

    var DesktopPlayer = _.extend({

        volumeSlider: document.getElementById('volume-slider'),

        init: function() {
            PlayerController.init();

            this.setupBaseEvents();

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
        }

    }, PlayerView);

    return DesktopPlayer;
});
