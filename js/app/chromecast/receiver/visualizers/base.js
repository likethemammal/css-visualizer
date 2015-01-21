define(['app/options', 'bean', 'app/chromecast/receiver/player', 'app/chromecast/receiver/queue'], function (Options, Bean, Player, Queue) {
    var Base = {
        visualizer: document.getElementById('visualizer'),

        run: function() {
            this.clear();

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
            if (Player.isPlaying) {

                var spectrum, waveform;

                if (this.onSpectrum) {
                    this.onSpectrum(Queue.audiodata);
                }

                if (this.onWaveform) {
                    this.onWaveform(Queue.audiodata);
                }
            }
        },

        destroy: function() {
            clearInterval(this.AnimationTimer);

            if (this.onDestroy) {
                this.onDestroy();
            }
        }
    };

    return Base;
});