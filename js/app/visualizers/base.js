define(['app/options', 'bean'], function (Options, Bean) {
    var Base = {
        visualizer: document.getElementById('visualizer'),
        AnimationTimer: '',

        color1: '',
        color2: '',
        color3: '',

        // Needed to compensate for low volumes
        volumeModifier: 1,

        run: function() {
            this.clear();

            Bean.on(window, 'visualizer.setVolume', _.bind(this.setVolumeModifier, this));
            Bean.fire(window, 'playerController.announceVolume'); //Needed to set volumeModifer each time visualizer switches

            this.resetColors();
            this.resetInputColors();

            this.init();

            var fps = 60;
            if (this.fps) {
                fps = this.fps;
            }

            this.AnimationTimer = setInterval(_.bind(this.getData, this), 50 + (60 - this.fps));
        },

        clear: function() {
            var styleSheet = document.getElementById('visualizer-css');
            if (styleSheet) {
                document.head.removeChild(styleSheet);
            }
            this.visualizer.innerHTML = '';
        },

        getData: function() {
            if (dancer.isPlaying() && !Options.hideVis) {
                var spectrum, waveform;

                this.isPlaying = true;

                if (this.onSpectrum) {
                    spectrum = float32ToArray(dancer.getSpectrum());
                    this.onSpectrum(spectrum);
                }

                if (this.onWaveform) {
                    waveform = float32ToArray(dancer.getWaveform());
                    this.onWaveform(waveform);
                }
            } else {
                this.isPlaying = false;
            }
        },

        onColorChange: function() {
            if (this.setColors) {
                this.manualColorSwitch = true;
                this.setColors();
            }
        },

        resetColors: function() {
            this.color1 = randomColor();
            this.color2 = randomColor();
            this.color3 = randomColor();
            this.resetInputColors();
        },

        resetInputColors: function() {
            Bean.fire(window, 'view.resetColors', [[this.color1, this.color2, this.color3]]);
        },

        setVolumeModifier: function(volume) {
            this.volumeModifier = (1 / volume);
        },

        destroy: function() {
            clearInterval(this.AnimationTimer);
            Bean.off(window, 'visualizer.setVolume');

            if (this.onDestroy) {
                this.onDestroy();
            }
        }
    };

    return Base;
});