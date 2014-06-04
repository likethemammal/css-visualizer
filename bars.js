var Visualizers = Visualizers || {}

Visualizers.Bars = _.extend({
    numOfBars: 45,
    currentAmp: 0,
    init: function() {
        var rgbStr = randomColor(),
            stylesStr = '',
            styleSheet = document.createElement('style');
            
        
        for (var i = 0; i < this.numOfBars; i++) {
            var bar = document.createElement('div'),
                beforeStr = '.bar:nth-of-type(' + (i + 1) + '):before { background-color: ' + lighterColor(rgbStr, 0.1) + '; }',
                afterStr = '.bar:nth-of-type(' + (i + 1) + '):after { background-color: ' + darkerColor(rgbStr, 0.1) + '; }',
                barStr = '.bar:nth-of-type(' + (i + 1) + ') { background-color: ' + darkerColor(rgbStr, 0.2) + '; }';

            bar.className = 'bar';
            bar.style.bottom = i*14 + "px";
            bar.style['-webkit-transform'] = "translate3d(-50%, 0, 0)";

            stylesStr += beforeStr + afterStr + barStr;
            
            this.visualizer.appendChild(bar);

            rgbStr = lighterColor(rgbStr, 0.01);
        }
        
        styleSheet.id = 'visualizer-css';
        styleSheet.innerHTML = stylesStr;
        document.head.appendChild(styleSheet);

        
        this.bars = document.getElementsByClassName('bar');
    },
    
    onWaveform: function(waveform) { 
        var sampleAvgs = sampleArray(waveform, this.numOfBars);
    
        for (var j = 0; j < this.bars.length; j++) {
            this.bars[j].style['-webkit-transform'] = "translate3d(" + (sampleAvgs[j]*100 - 50) + "%, 0, 0)";
        }

        this.currentAmp++;
    }
}, Visualizers.Base);