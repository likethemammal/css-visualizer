define(['app/models/audio-data-packet' ,'backbone'], function(AudioDataPacket, Backbone) {

    var Song = Backbone.Model.extend({

        metadata: {},
        listened: false,
        audioDataPacket: new AudioDataPacket(),

        setMetadata: function(songInfo, serialized) {
            this.metadata = (serialized) ? JSON.parse(songInfo) : songInfo;
        },

        getMetadata: function(serialize) {
            return (serialize) ? JSON.stringify(this.metadata) : this.metadata;
        },

        showData: function() {
            console.log(this.audioDataPacket);
        }
    });

    return Song;
});
