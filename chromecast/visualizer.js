var Bean = bean;

var Base = {
    visualizer: document.getElementById('visualizer'),
    AnimationTimer: '',

    color1: randomColor(),
    color2: randomColor(),
    color3: randomColor(),

    fps: 60,


    currentSecond: 0,
    currentFrame: 0,

    // Needed to compensate for low volumes
    volumeModifier: 1,

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

        var spectrum, waveform;
        var data = Queue.audioData[this.currentSecond][this.currentFrame];

        if (this.onSpectrum) {
            this.onSpectrum(data);
        }

        if (this.onWaveform) {
            this.onWaveform(data);
        }


        if (this.currentFrame > this.fps) {
            this.currentSecond++;
            this.currentFrame = 0;
        } else {
            this.currentFrame++;
        }
    },

    destroy: function() {
        clearInterval(this.AnimationTimer);

        if (this.onDestroy) {
            this.onDestroy();
        }
    }
};