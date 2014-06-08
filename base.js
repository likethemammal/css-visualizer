var Visualizers = Visualizers || {}

Visualizers.Base = {
    visualizer: document.getElementById('visualizer'),
    AnimationTimer: '',
    
    run: function() {
        this.clear();
        
        Visualizers.currentVisualizer = this;
        
        this.init();
        
        var fps = 60
        if (this.fps) {
            var fps = this.fps;
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
        if (dancer.isPlaying()) {
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
    
    destroy: function() {
        clearInterval(this.AnimationTimer);
        if (this.onDestroy) {
            this.onDestroy();
        }
    }
};