var Visualizers = Visualizers || {}

Visualizers.Base = {
    visualizer: document.getElementById('visualizer'),
    
    run: function() {
        this.clear();
        
        Visualizers.currentVisualizer = this;
        
        this.init();
        
        var fps = 60
        if (this.fps) {
            var fps = this.fps;
        }
        
        Timer = setInterval(_.bind(this.getData, this), 50 + (60 - this.fps));
//         Timer = requestAnimationFrame(_.bind(this.getData, this));
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
//         requestAnimationFrame(_.bind(this.getData, this));
    },
    
    destroy: function() {
        clearInterval(Timer);
//         cancelAnimationFrame(Timer);
        if (this.onDestroy) {
            this.onDestroy();
        }
    }
};