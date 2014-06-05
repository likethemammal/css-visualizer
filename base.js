var Visualizers = Visualizers || {}

Visualizers.Base = {
    visualizer: document.getElementById('visualizer'),
    
    run: function() {
        this.clear();
        
        Visualizers.currentVisualizer = this;
        
        this.init();
        Timer = setInterval(_.bind(function() {
            var spectrum, waveform;
            if (this.onSpectrum) {
                spectrum = float32ToArray(dancer.getSpectrum());
                this.onSpectrum(spectrum);
            }
            
            if (this.onWaveform) {
                waveform = float32ToArray(dancer.getWaveform());
                this.onWaveform(waveform);
            }
        }, this), 50); 
    },
    
    clear: function() {
        var styleSheet = document.getElementById('visualizer-css');
        if (styleSheet) {
            document.head.removeChild(styleSheet);
        }
        clearInterval(Timer);
        this.visualizer.innerHTML = '';
    },
    
    destroy: function() {
        if (this.onDestroy) {
            this.onDestroy();
        }
    }
};