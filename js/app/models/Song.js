define(['app/models/audio-data-packet' ,'backbone'], function(AudioDataPacket, Backbone) {

    var Song = Backbone.Model.extend({

        metadata: {},
        listened: false,
        audioDataPacket: new AudioDataPacket(),

        setMetadata: function(songInfo) {
            this.metadata = songInfo;
        },

        showData: function() {
            console.log(this.audioDataPacket);
        }
    });

    return Song;
});
