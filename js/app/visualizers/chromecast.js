define([
    'app/visualizers/base',
    'app/options',
    'underscore',
    'bean',
    'app/chromecast/receiver/visualizers/bars'
], function (Base, Options, _, Bean, chromecastVisualizer) {

    var Chromecast = _.extend({

        audioData: '',
        dataPacketTimer: '',
        songChanged: false,

        init: function() {
            Bean.on(window, 'chromecastConnected', this.onSocketConnection.bind(this));
            Bean.on(window, 'visualizer.songChanged', this.onSongChange.bind(this));
        },

        onSocketConnection: function(visualizerSettings) {
            this.fps = visualizerSettings.fps * Options.chromecastPlaybackRate;
            this.numOfBars = visualizerSettings.numOfBars;

            this.dataPacketTimer = setInterval(this.sendDataPacket.bind(this), 1000);
        },

        onSongChange: function() {
            this.audioData = [];
            this.songChanged = true;
        },

        onWaveform: function(waveform) {
            var sampleAvgs = sampleArray(waveform, this.numOfBars, this.volumeModifier);

            this.packData(sampleAvgs);
        },

        packData: function(data) {
            this.audioData.push(data);
        },

        sendDataPacket: function() {
            if (this.isPlaying) {

                Bean.fire(window, 'socket.audiodata', {
                    songChanged: this.songChanged,
                    audiodata: this.audioData
                });

                this.songChanged = false;
                this.audioData = [];

            }
        },

        onDestroy: function() {
            clearInterval(this.dataPacketTimer);
        }

    }, Base);

    return Chromecast;

});