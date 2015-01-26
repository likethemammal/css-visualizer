define(['app/options', 'bean', 'app/models/audio-data-packet'], function(Options, Bean, AudioDataPacket) {

    var Queue = {

        audioDataPacket: AudioDataPacket.newPacket(),

        init: function() {
            Bean.on(window, 'queue.audiodata', this.onAudiodata.bind(this));
        },

        onAudiodata: function(data) {
            if (data.songChanged) {
                this.audioDataPacket.empty();
            }

            this.audioDataPacket.merge(data.audioDataPacket);
        }
    };

    return Queue;
});
