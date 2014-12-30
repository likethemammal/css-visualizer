var Visualizers = Visualizers || {};

Visualizers.Bars = _.extend({
    numOfBars: 0,
    currentAmp: 0,
    fps: 40,
    init: function() {
        var reflectionOverlay = document.createElement('div'),
            styleSheet = document.createElement('style');
            
        reflectionOverlay.id = "reflection-overlay";
        this.visualizer.appendChild(reflectionOverlay);
        
        this.numOfBars = Math.ceil(window.innerWidth/24);
        
        for (var i = 0; i < this.numOfBars; i++) {
            var bar = document.createElement('div'),
                barWrapper = document.createElement('div');

            bar.className = 'bar';
            barWrapper.className = 'bar-wrapper';
            barWrapper.style.left = i*24 + "px";

            barWrapper.appendChild(bar);
            this.visualizer.appendChild(barWrapper);
        }

        this.setColors(styleSheet);

        styleSheet.id = 'visualizer-css';
        document.head.appendChild(styleSheet);

        this.bars = document.getElementsByClassName('bar');
    },

    setColors: function(styleSheet) {
        styleSheet = styleSheet || document.getElementById('visualizer-css');
        var stylesStr = '';

        for (var i = 0; i < this.numOfBars; i++) {

            var startOfSelectorStr = '.bar-wrapper:nth-of-type(' + (i + 2) + ') .bar', // Its '+ 2' because reflectionOverlay is first-child
                beforeStr = startOfSelectorStr + ':before { background-color: ' + lighterColor(this.color1, 0.1) + '; }',
                afterStr = startOfSelectorStr + ':after { background-color: ' + darkerColor(this.color1, 0.1) + '; }',
                barStr = startOfSelectorStr + ' { background-color: ' + darkerColor(this.color1, 0.2) + '; }';

            stylesStr += beforeStr + afterStr + barStr;

            this.color1 = fadeToColor(this.color1, this.color2, 1/this.numOfBars);
        }

        styleSheet.innerHTML = stylesStr;
    },
    
    onWaveform: function(waveform) { 
        var sampleAvgs = sampleArray(waveform, this.numOfBars);
        var bars = this.bars;
    
        for (var j = 0; j < this.numOfBars; j++) {
            bars[j].parentNode.style[prefix.css + 'transform'] = ["scaleY(", (Math.floor(sampleAvgs[j]*1000)/1000), ") translate3d(0,0,0)"].join("");
        }
    }
}, Visualizers.Base);