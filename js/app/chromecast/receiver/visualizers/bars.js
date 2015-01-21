define(['underscore', 'app/chromecast/receiver/visualizers/base'], function (Base) {

    var Bars = _.extend({

        //Anything in this object will be sent to the chromecast visualizer on the desktop (after init() has run)
        settings: {
            fps: 40,
            numOfBars: 0
        },

        barWidth: 24,
        bars: [],

        init: function() {
            this.settings.numOfBars = window.innerWidth / this.barWidth;
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

    Bars.init();

    return Bars;

});