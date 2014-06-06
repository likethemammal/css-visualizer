var Visualizers = Visualizers || {}

Visualizers.Bars = _.extend({
    numOfBars: Math.ceil(window.innerWidth/24),
    currentAmp: 0,
    fps: 40,
    init: function() {
        var reflectionOverlay = document.createElement('div'),
            rgbStr = randomColor(),
            rgbStr2 = randomColor(),
            stylesStr = '',
            styleSheet = document.createElement('style');
            
        reflectionOverlay.id = "reflection-overlay";
        this.visualizer.appendChild(reflectionOverlay);
            
        for (var i = 0; i < this.numOfBars; i++) {
            var startOfSelectorStr = '.bar-wrapper:nth-of-type(' + (i + 2) + ') .bar', // Its '+ 2' because reflectionOverlay is first-child
                bar = document.createElement('div'),
                barWrapper = document.createElement('div'),
                beforeStr = startOfSelectorStr + ':before { background-color: ' + lighterColor(rgbStr, 0.1) + '; }',
                afterStr = startOfSelectorStr + ':after { background-color: ' + darkerColor(rgbStr, 0.1) + '; }',
                barStr = startOfSelectorStr + ' { background-color: ' + darkerColor(rgbStr, 0.2) + '; }';

            bar.className = 'bar';
            barWrapper.className = 'bar-wrapper';
            barWrapper.style.left = i*24 + "px";

            stylesStr += beforeStr + afterStr + barStr;
                        
            barWrapper.appendChild(bar);
            this.visualizer.appendChild(barWrapper);

            rgbStr = fadeToColor(rgbStr, rgbStr2, 1/this.numOfBars);
        }
        
        styleSheet.id = 'visualizer-css';
        styleSheet.innerHTML = stylesStr;
        document.head.appendChild(styleSheet);

        this.bars = document.getElementsByClassName('bar');
    },
    
    onWaveform: function(waveform) { 
        var sampleAvgs = sampleArray(waveform, this.numOfBars);
        var bars = this.bars;
    
        for (var j = 0; j < this.numOfBars; j++) {
            bars[j].parentNode.style['-webkit-transform'] = ["scaleY(", (Math.floor(sampleAvgs[j]*1000)/1000), ") translate3d(0,0,0)"].join("");
        }
    }
}, Visualizers.Base);