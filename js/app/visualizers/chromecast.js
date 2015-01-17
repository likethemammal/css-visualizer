define([
    'app/visualizers/base',
    'app/options',
    'underscore',
    'bean',
    'app/chromecast/receiver/visualizer'
], function (Base, Options, _, Bean, chromecastVisualizer) {

    var Chromecast = _.extend({

        fps: chromecastVisualizer.fps * Options.chromecastPlaybackRate,
        audioData: '',
        dataPacketTimer: '',

        init: function() {
            this.dataPacketTimer = setInterval(this.sendDataPacket.bind(this), 1000);
        },

        onWaveform: function(waveform) {
            var sampleAvgs = sampleArray(waveform, chromecastVisualizer.numOfBars, this.volumeModifier);

            this.packData(sampleAvgs);
        },

        packData: function(data) {
            this.audioData.push(data);
        },

        sendDataPacket: function() {
            if (this.isPlaying) {

                Bean.fire(window, 'socket.audiodata', this.audioData);

                this.audioData = [];

            }
        },

        onDestroy: function() {
            clearInterval(this.dataPacketTimer);
        }

    }, Base);

    return Chromecast;

});