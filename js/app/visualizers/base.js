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

            this.binCount = analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(this.binCount);

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
            if (!PlayerModel.audio.paused && !Options.hideVis) {
                var spectrum, waveform;

                this.isPlaying = true;

                if (this.onSpectrum) {
                    spectrum = this.getSpectrum();
                    this.onSpectrum(spectrum);
                }

                if (this.onWaveform) {
                    waveform = this.getWaveform();
                    this.onWaveform(waveform);
                }
            } else {
                this.isPlaying = false;
            }
        },

        getSpectrum: function() {
            var spectrum = [];
            var binCount = this.binCount;
            var spectrumLength = this.dataArray.length;
            var value;

            analyser.getByteFrequencyData(this.dataArray);

            for (var i = 0; i < spectrumLength; i++) {
                value = this.dataArray[i];

                value = (value / this.volumeModifier) / (binCount * 4);

                spectrum.push(value);
            }

            return spectrum;
        },


        getWaveform: function() {
            var spectrum = [];
            var waveformLength = this.dataArray.length;
            var value;

            analyser.getByteTimeDomainData(this.dataArray);

            for (var i = 0; i < waveformLength; i++) {
                value = this.dataArray[i];

                value = value - 128;
                value = value / 128;

                spectrum.push(value);
            }

            return spectrum;
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
            Bean.fire(window, 'view.resetColors', [[this.color1, this.color2, this.color3], this.colorsNeeded]);
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