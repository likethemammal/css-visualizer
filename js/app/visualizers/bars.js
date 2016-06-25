define(['app/visualizers/base', 'underscore', 'bean'], function (Base, _, Bean) {

    var Bars = _.extend({
        name: 'Bars',
        numOfBars: 0,
        currentAmp: 0,
        fps: 40,
        barWidth: 24,
        colorsNeeded: 2,
        init: function() {
            var styleSheet = document.createElement('style');

            this.numOfBars = Math.ceil(window.innerWidth/this.barWidth);

            this.setColors(styleSheet);

            styleSheet.id = 'visualizer-css';
            document.head.appendChild(styleSheet);

            this.setupElements();

            Bean.on(window, 'visualizer.onResize', _.bind(this.onResize, this));
        },

        setupElements: function() {
            var reflectionOverlay = document.createElement('div');

            reflectionOverlay.id = "reflection-overlay";

            this.visualizer.innerHTML = '';
            this.visualizer.appendChild(reflectionOverlay);

            for (var i = 0; i < this.numOfBars; i++) {
                var bar = document.createElement('div'),
                    barWrapper = document.createElement('div');

                bar.className = 'bar';
                barWrapper.className = 'bar-wrapper';
                barWrapper.style.left = i*24 + "px";

                barWrapper.appendChild(bar);
                this.visualizer.appendChild(barWrapper);
            }

            this.bars = document.getElementsByClassName('bar');
        },

        setColors: function(styleSheet) {
            styleSheet = styleSheet || document.getElementById('visualizer-css');
            var stylesStr = '';
            var color = this.color1;

            for (var i = 0; i < this.numOfBars; i++) {

                var startOfSelectorStr = '.bar-wrapper:nth-of-type(' + (i + 2) + ') .bar', // Its '+ 2' because reflectionOverlay is first-child
                    beforeStr = startOfSelectorStr + ':before { background-color: ' + lighterColor(color, 0.1) + '; }',
                    afterStr = startOfSelectorStr + ':after { background-color: ' + darkerColor(color, 0.1) + '; }',
                    barStr = startOfSelectorStr + ' { background-color: ' + darkerColor(color, 0.2) + '; }';

                stylesStr += beforeStr + afterStr + barStr;

                color = fadeToColor(color, this.color2, 1/this.numOfBars);
            }

            styleSheet.innerHTML = stylesStr;
        },

        onWaveform: function(waveform) {
            var sampleAvgs = sampleArray(waveform, this.numOfBars, this.volumeModifier);
            var bars = this.bars;

            for (var j = 0; j < this.numOfBars; j++) {
                var magnitude = (Math.floor(sampleAvgs[j]*1000)/1000);
                bars[j].parentNode.style[prefix.css + 'transform'] = ["scaleY(", magnitude, ") translate3d(0,0,0)"].join("");
            }
        },

        onResize: function() {
            var styleSheet = document.getElementById('visualizer-css');

            this.numOfBars = Math.ceil(window.innerWidth/24);
            this.setupElements();
            this.setColors(styleSheet);
        },

        onDestroy: function() {
            Bean.off(window, 'visualizer.onResize');
        }
    }, Base);

    return Bars;

});