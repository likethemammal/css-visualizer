var Visualizers = Visualizers || {};

Visualizers.Base = {
    visualizer: document.getElementById('visualizer'),
    AnimationTimer: '',

    color1: randomColor(),
    color2: randomColor(),
    color3: randomColor(),

    run: function() {
        this.clear();
        
        Visualizers.currentVisualizer = this;

        // Needs to be hexcolor for some reason.
        App.colorPicker1.value = this.color1;
        App.colorPicker2.value = this.color2;
        App.colorPicker3.value = this.color3;

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
        if (dancer.isPlaying() && !App.hideVis) {
            var spectrum, waveform;

            if (this.onSpectrum) {
                spectrum = float32ToArray(dancer.getSpectrum());
                this.onSpectrum(spectrum);
            }
            
            if (this.onWaveform) {
                waveform = float32ToArray(dancer.getWaveform());
                this.onWaveform(waveform);
            }
        }
    },

    onColorChange: function() {
        if (this.setColors) {
            this.manualColorSwitch = true;
            this.setColors();
        }
    },
    
    destroy: function() {
        clearInterval(this.AnimationTimer);
        if (this.onDestroy) {
            this.onDestroy();
        }
    }
};