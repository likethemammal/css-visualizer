
var Bars = {

    fps: 40,

    init: function() {

    },

    onWaveform: function(waveform) {
        var sampleAvgs = sampleArray(waveform, this.numOfBars, this.volumeModifier);
        var bars = this.bars;

        for (var j = 0; j < this.numOfBars; j++) {
            var magnitude = (Math.floor(sampleAvgs[j]*1000)/1000);
            bars[j].parentNode.style[prefix.css + 'transform'] = ["scaleY(", magnitude, ") translate3d(0,0,0)"].join("");
        }
    }

};