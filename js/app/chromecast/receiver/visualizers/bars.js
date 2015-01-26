define(['underscore', 'app/chromecast/receiver/visualizers/base'], function (_, Base) {

    var Bars = _.extend({

        visualizer: document.getElementById('visualizer'),

        color1: randomColor(),
        color2: randomColor(),

        //Anything in this object will be sent to the chromecast visualizer on the desktop (after init() has run)
        settings: {
            fps: 40,
            numOfBars: 0
        },

        barWidth: 24,
        bars: [],

        init: function() {
            this.setNumOfBars();

            var styleSheet = document.createElement('style');

            this.setColors(styleSheet);

            styleSheet.id = 'visualizer-css';
            document.head.appendChild(styleSheet);

            this.setupElements();
        },

        setNumOfBars: function() {
            this.settings.numOfBars = Math.floor(window.innerWidth / this.barWidth);
        },

        setupElements: function() {
            var reflectionOverlay = document.createElement('div');

            reflectionOverlay.id = "reflection-overlay";

            this.visualizer.innerHTML = '';
            this.visualizer.appendChild(reflectionOverlay);

            for (var i = 0; i < this.settings.numOfBars; i++) {
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

            for (var i = 0; i < this.settings.numOfBars; i++) {

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
            var bars = this.bars;
            var numBars = this.settings.numOfBars;

            for (var j = 0; j < numBars; j++) {
                var magnitude = (Math.floor(waveform[j]*1000)/1000);
                bars[j].parentNode.style[prefix.css + 'transform'] = ["scaleY(", magnitude, ") translate3d(0,0,0)"].join("");
            }
        }

    }, Base);

    //Need to run this so that window.innerWidth is the width of the chromecast's window, later sent to desktop
    Bars.setNumOfBars();

    return Bars;

});