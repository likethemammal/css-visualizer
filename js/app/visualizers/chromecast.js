define([
    'app/visualizers/base',
    'app/model',
    'app/models/audio-data-packet',
    'app/options',
    'underscore',
    'bean'
], function (
    Base,
    Model,
    AudioDataPacket,
    Options,
    _,
    Bean) {

    var Chromecast = _.extend({

        name: 'Chromecast',

        audioDataPacket: AudioDataPacket.newPacket(),
        dataPacketTimer: '',
        songChanged: false,

        init: function() {
            if (this.chromecastConnected) {
                this.onSocketConnection(this.visualizerSettings);
            } else {
                Bean.on(window, 'chromecastConnected', this.onSocketConnection.bind(this));
            }
            Bean.on(window, 'visualizer.songChanged', this.onSongChange.bind(this));
        },

        onSocketConnection: function(visualizerSettings) {
            this.fps = visualizerSettings.fps * Options.chromecastPlaybackRate;
            this.numOfBars = visualizerSettings.numOfBars;

            this.dataPacketTimer = setInterval(this.sendDataPacket.bind(this), 1000);
        },

        onSongChange: function() {
            this.audioDataPacket.empty();
            this.songChanged = true;
        },

        onWaveform: function(waveform) {
            var sampleAvgs = sampleArray(waveform, this.numOfBars, this.volumeModifier);
            var currentSecond = Math.floor(Model.audio.currentTime);

            this.audioDataPacket.packFrame(sampleAvgs, currentSecond);
        },

        sendDataPacket: function() {
            if (this.isPlaying) {

                Bean.fire(window, 'socket.audiodata', {
                    songChanged: this.songChanged,
                    audioDataPacket: this.audioDataPacket
                });

                this.songChanged = false;
                this.audioDataPacket.empty();
            }
        },

        onDestroy: function() {
            clearInterval(this.dataPacketTimer);
        }

    }, Base);

    return Chromecast;

});