define([
    'app/visualizers/base',
    'app/model',
    'app/options',
    'underscore',
    'bean'
], function (
    Base,
    Model,
    Options,
    _,
    Bean) {

    var Chromecast = _.extend({

        name: 'Chromecast',

        audioData: '',
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
            this.audioData = [];
            this.songChanged = true;
        },

        onWaveform: function(waveform) {
            var sampleAvgs = sampleArray(waveform, this.numOfBars, this.volumeModifier * 100);

            this.packData(sampleAvgs);
        },

        packData: function(data) {
            //Set the data packet to the audio's currentTime
            var currentTime = Math.floor(Model.audio.currentTime);
            var currentTimeSlot = this.audioData[currentTime] || [];

            currentTimeSlot.push(data);

            this.audioData[currentTime] = currentTimeSlot;
        },

        sendDataPacket: function() {
            if (this.isPlaying) {

                Bean.fire(window, 'socket.audiodata', {
                    songChanged: this.songChanged,
                    audiodata: this.audioData
                });

                this.songChanged = false;
                this.audioData = {};

            }
        },

        onDestroy: function() {
            clearInterval(this.dataPacketTimer);
        }

    }, Base);

    return Chromecast;

});