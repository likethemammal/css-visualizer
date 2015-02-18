define([
    'app/visualizers/base',
    'app/models/player',
    'app/options',
    'underscore',
    'bean'
], function (
    Base,
    PlayerModel,
    Options,
    _,
    Bean) {

    var Chromecast = _.extend({

        name: 'Chromecast',

        init: function() {
            if (this.chromecastConnected) {
                this.onSocketConnection(this.visualizerSettings);
            } else {
                Bean.on(window, 'chromecastConnected', this.onSocketConnection.bind(this));
            }
        },

        onSocketConnection: function(visualizerSettings) {
            this.fps = visualizerSettings.fps * Options.chromecastPlaybackRate;
            this.numOfBars = visualizerSettings.numOfBars;
        },

        onWaveform: function(waveform) {
            var sampleAvgs = sampleArray(waveform, this.numOfBars, this.volumeModifier, 3);
            var currentSecond = Math.floor(PlayerModel.audio.currentTime);

            Bean.fire(window, 'queue.packFrame', sampleAvgs, currentSecond);
        }

    }, Base);

    return Chromecast;

});